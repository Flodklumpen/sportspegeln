def get_string_from_date(date):
    if date is not None:
        return date.strftime('%Y-%m-%d')
    else:
        return None
