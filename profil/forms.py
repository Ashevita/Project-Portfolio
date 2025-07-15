from django.forms import ModelForm
from profil.models import Profil

class ProfilForm(ModelForm):
    class Meta:
        model = Profil
        fields = ["pseudo", "bio"]


