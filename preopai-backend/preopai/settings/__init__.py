import os

DJANGO_ENV = os.getenv("DJANGO_ENV", "dev")  # default to dev if not set

if DJANGO_ENV == "prod":
    from .prod import *
# elif DJANGO_ENV == "test":
#     from .test import *
else:  # fallback to dev
    from .dev import *