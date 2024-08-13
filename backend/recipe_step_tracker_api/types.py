import strawberry_django
from strawberry import auto, ID
from typing import Optional
from strawberry_django import filters

from .models import RecipeStep as RecipeStepModel

@strawberry_django.type(RecipeStepModel)
class RecipeStep:
    id: ID
    step: auto  #auto import from strawberry under the hood it is looking for the data types we specified
    completed: auto 


@strawberry_django.input(RecipeStepModel)
class RecipeStepInput:
    step: auto #accept step input 
    completed: auto  #accept completed field 


#use a partial type that you can use to have an update step 
#id is required in this case 
@strawberry_django.partial(RecipeStepModel)
class PartialRecipeStepInput:
    id: ID
    step: auto
    completed: auto


@strawberry_django.input(RecipeStepModel)
class RecipeStepIDInput:
    id: ID
