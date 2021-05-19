from datetime import datetime


def existing_fields(data, fields):
    return all(elem in data for elem in fields)


def filled_fields(data, fields):
    for field in fields:
        if not data[field]:
            return False
    return True


def get_date_from_string(string_date):
    """
    Create a datetime object from a string representing a date
    :param string_date: string on format YYYY-MM-DD
    :returns: datetime object
    """
    try:
        date = datetime.strptime(string_date, '%Y-%m-%d').date()
        return date
    except ValueError:
        return None


def get_time_from_string(string_time):
    """
    Create a datetime object from a string representing a time
    :param string_time: string on format HH-MM
    :returns: datetime object
    """
    try:
        time = datetime.strptime(string_time, '%H-%M').time()
        return time
    except ValueError:
        return None


def is_date_before(first_date, second_date):
    """
    Checks if a date is before another
    :param first_date: datetime object
    :param second_date: datetime object
    :returns: bool
    """
    return first_date < second_date
