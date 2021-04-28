#This is a temporary file, and will be inserted into "tournament"

from datetime import date, datetime
from flask import Blueprint, request, jsonify
from ..models import query

match_bp = Blueprint('match_bp', __name__)

def existing_fields(data, fields):
    return all(elem in data for elem in fields)


def filled_fields(data, fields):
    for field in fields:
        if not data[field]:
            return False
    return True

@match_bp.route('/create_match', methods=['POST'])
def create_match():
    return 200
