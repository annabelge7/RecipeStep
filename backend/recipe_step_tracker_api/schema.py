import strawberry
import strawberry_django
from strawberry_django.optimizer import DjangoOptimizerExtension
from strawberry_django import mutations
from typing import Optional, List


from .types import RecipeStepModel, RecipeStep, RecipeStepInput, PartialRecipeStepInput, RecipeStepIDInput

@strawberry.type
class Query: #this is the query type 
    #the name of the side we want querable from the client side 
    # recipe_steps: list[RecipeStep] = strawberry_django.field() 
    #return a list but associate with a resolver that is under the hood, 
    #automatically associtate recipe step models that is convereted into something the client can consume 
    
    #https://strawberry.rocks/docs/types/resolvers used resolvers instead of filers 
    @strawberry.field
    def recipe_steps(completed: Optional[bool] = None) -> List[RecipeStep]: #optional then to use completed filters
        query = RecipeStepModel.objects.all()   #first gets all recipes 
        if completed is not None: #then checks the completed argument 
            query = query.filter(completed=completed) #filters based on that 
        return query #returns either filtered or unfiltered 

@strawberry.type
class Mutation:
    add_recipe_step: RecipeStep = mutations.create(RecipeStepInput) #specify return type and then the type that what we want to associate resolver with
    delete_recipe_step: RecipeStep = mutations.delete(RecipeStepIDInput)
    update_recipe_step: RecipeStep = mutations.update(PartialRecipeStepInput)
  
 

schema = strawberry.Schema(
    query=Query,
    mutation=Mutation, 
    extensions=[DjangoOptimizerExtension] #extension to optimize queries  
)

