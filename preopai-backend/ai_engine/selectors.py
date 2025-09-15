from typing import Iterable
from forms.models import Response

def response_list() -> Iterable[Response]:
    """
    Selector to return all responses.
    """
    return Response.objects.all()

def response_get(*, id) -> Response:
    """
    Selector to return a single form by ID.
    """
    return Response.objects.get(id=id)