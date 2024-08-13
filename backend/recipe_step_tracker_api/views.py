from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RecipeStep
from .serializers import RecipeStepSerializer

class RecipeStepApiView(APIView):
  def get(self, request, *args, **kwargs):
    steps = RecipeStep.objects
    serializer = RecipeStepSerializer(steps, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  def post(self, request, *args, **kwargs):
    data = {
      "step": request.data.get("step"), 
      "completed": request.data.get("completed")
    }

    serializer = RecipeStepSerializer(data=data)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)