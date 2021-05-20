def get_string_from_date(date):
    """
    Returns a string representation of a given date.

    :param date: a datetime object
    :returns: a String representation of date on the format YYYY-MM-DD
    """
    if date is not None:
        return date.strftime('%Y-%m-%d')
    else:
        return None
