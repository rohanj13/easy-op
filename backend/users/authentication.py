import jwt
from jwt import PyJWKClient

from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from users.models import CognitoUser

class CognitoAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            token = auth_header.split(" ")[1]
            jwks_url = f"https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_Kp4EsFsRG/.well-known/jwks.json"
            jwks_client = PyJWKClient(jwks_url)
            signing_key = jwks_client.get_signing_key_from_jwt(token)

            payload = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
                audience=settings.COGNITO_AUDIENCE,
            )

            sub = payload["sub"]
            email = payload.get("email")
            groups = payload.get("cognito:groups", [])

            # Extract role from Cognito group
            role = 'patient'
            if 'doctor' in groups:
                role = 'doctor'
            elif 'nurse' in groups:
                role = 'nurse'

            user, created = CognitoUser.objects.get_or_create(
                cognito_sub=sub,
                defaults={"email": email, "role": role}
            )

            # Optionally sync role from Cognito
            if not created and user.role != role:
                user.role = role
                user.save(update_fields=["role"])

            return (user, None)

        except Exception as e:
            raise exceptions.AuthenticationFailed(f"JWT verification failed: {str(e)}")