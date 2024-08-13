from django.urls import path
from .views import (RecipeStepApiView)

from strawberry.django.views import AsyncGraphQLView
from .schema import schema

urlpatterns = [
  path('recipe-steps', RecipeStepApiView.as_view()),
  path('graphql', AsyncGraphQLView.as_view(schema=schema))
]