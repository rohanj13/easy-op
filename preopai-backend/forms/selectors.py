from typing import Iterable
from forms.models import Form

def form_list() -> Iterable[Form]:
    """
    Selector to return all forms.
    """
    return Form.objects.all()

def form_get(*, id) -> Form:
    """
    Selector to return a single form by ID.
    """
    return Form.objects.get(id=id)