from drf_spectacular.extensions import OpenApiAuthenticationExtension

class CognitoAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = 'users.authentication.CognitoAuthentication'  # path to your class
    name = 'BearerAuth'  # MUST match what's in SPECTACULAR_SETTINGS['SECURITY']

    def get_security_definition(self, auto_schema):
        return {
            'type': 'http',
            'scheme': 'bearer',
            'bearerFormat': 'JWT'
        }