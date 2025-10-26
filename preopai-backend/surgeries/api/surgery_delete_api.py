from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from surgeries.services import surgery_delete

class SurgeryDeleteApi(APIView):
    def delete(self, request, id):
        deleted = surgery_delete(id=id)
        if deleted:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
