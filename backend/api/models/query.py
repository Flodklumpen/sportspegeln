""" A "collection point" for the query files. Imports:
    - query_create
    - query_edit
    - query_get
    - query_in_db
    - query_misc
    So that routing files only need to import this one file.
    For more information, see the respective files.
"""

from .query_create import *
from .query_edit import *
from .query_get import *
from .query_in_db import *
from .query_misc import *
