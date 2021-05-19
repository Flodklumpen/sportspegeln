# most of this code is taken from Auth0's Quickstart for python
# https://auth0.com/docs/quickstart/backend/python/01-authorization

import os

import json
from six.moves.urllib.request import urlopen
from functools import wraps

from flask import Blueprint, request, jsonify, _request_ctx_stack
from flask_cors import cross_origin
from jose import jwt

from ..models import query

AUTH0_DOMAIN = os.environ.get("FLASK_APP_AUTH0_DOMAIN")
API_AUDIENCE = os.environ.get("FLASK_APP_API_AUDIENCE")
ALGORITHMS = ["RS256"]


# Error handler
class AuthError(Exception):
    """
    A class to represent the error thrown by authentication handling.

    :attribute error: a dict describing the error
    :attribute status_code: int
    """
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def handle_auth_error(ex):
    """
    Handles a raised AuthError.

    :param ex: the raised exception
    :returns: the response formulated by the error
    """
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


# Format error response and append status code
def get_token_auth_header():
    """
    Obtains the Access Token from the Authorization Header. Expects the
    Authorization Header to be on format {'Authorization':'Bearer TOKEN'}.

    :returns: String on success
    :raises AuthError: raises an exception if header is missing or on invalid
    format
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be Bearer token"}, 401)

    token = parts[1]
    return token


def get_user_id():
    """
    Obtains the email from the request header. Expects there to be a header on
    format {'User':STRING}.

    :returns: String on success
    :raises AuthError: raises an exception if header is missing or on invalid
    format
    """
    email = request.headers.get("User", None)
    if not email:
        raise AuthError({"code": "email_header_missing",
                        "description": "Email header expected"}, 401)

    user_id = query.get_user_id_from_email(email)

    if not user_id:
        raise AuthError({"code": "user_id_not_found",
                        "description": "User ID not found"}, 401)

    return user_id


def requires_auth(f):
    """
    Determines if the Access Token is valid´usign a decorator for end points
    that require authentication.

    :param f: the function that is decorated
    :returns: a decorator for f
    :raises AuthError: raises an exception if the Access Token is invalid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        user_id = get_user_id()
        jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        try:
            unverified_header = jwt.get_unverified_header(token)
        except Exception:
            raise AuthError({"code": "invalid_token",
                            "description": "error getting token."}, 401)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://"+AUTH0_DOMAIN+"/"
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    "please check the audience and issuer"}, 401)
            except Exception:
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 401)

            _request_ctx_stack.top.current_user = payload
            if payload["sub"] != user_id:
                raise AuthError({"code": "invalid_user_id",
                                "description": "User ID from token does not match database"},
                                401)
            return f(*args, **kwargs)
        raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 401)
    return decorated
