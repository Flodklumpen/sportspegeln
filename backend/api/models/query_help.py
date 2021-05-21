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


def get_string_from_time(time):
    """
    Returns a string representation of a given time.

    :param date: a datetime object
    :returns: a string representation of time on the format HH:MM
    """
    if time is not None:
        return time.strftime('%H:%M')
    else:
        return None
