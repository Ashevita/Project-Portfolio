from django.db import models
from django.contrib.auth.models import User


class Profil(models.Model):
    utilisateur = models.OneToOneField(User, on_delete=models.CASCADE)
    pseudo = models.CharField(max_length=100)
    date_inscription = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "profil"

    def __str__(self):
        return f"{self.pseudo}"
