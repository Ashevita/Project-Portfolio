from django.db import models
from profil.models import Profil

class Review(models.Model):
    profils = models.ForeignKey(Profil, on_delete=models.CASCADE)
    movie_name = models.CharField(max_length=255)
    movie_id = models.CharField(max_length=50, unique=True)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.movie_name} - {self.rating} stars by {self.profil.pseudo}"
