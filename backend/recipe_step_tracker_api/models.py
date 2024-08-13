from django.db import models

class RecipeStep(models.Model):
  step = models.CharField(max_length=500)
  completed = models.BooleanField(default=False, blank=True)

  def __str__(self):
    return self.step
