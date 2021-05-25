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

    :param time: a time object
    :returns: a string representation of time on the format HH:MM
    """
    if time is not None:
        return time.strftime('%H:%M')
    else:
        return None


def create_tournament_response(tournaments):
    result = []

    for tournament in tournaments:
        curr_tournament = {
            'id': tournament[0],
            'name': tournament[1],
            'start_date': get_string_from_date(tournament[2]),
            'end_date': get_string_from_date(tournament[3]),
            'owner': tournament[4]
        }
        result.append(curr_tournament)

    return result
