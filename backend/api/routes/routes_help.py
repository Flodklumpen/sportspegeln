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
    Ensures that the given date is on format YYYY-MM-DD
    """
    try:
        date = datetime.strptime(string_date, '%Y-%m-%d').date()
        return date
    except ValueError:
        return None


def get_time_from_string(string_time):
    """
    Ensures that the given time is on format HH-MM
    """
    try:
        time = datetime.strptime(string_time, '%H-%M').time()
        return time
    except ValueError:
        return None


def is_date_before(first_date, second_date):
    return first_date < second_date
