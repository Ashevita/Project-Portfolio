# views.py
from django.shortcuts import render, redirect, get_object_or_404
from .models import Profil
from django.contrib.auth.decorators import login_required
from .forms import ProfilForm
from datetime import datetime



@login_required
def profil(request, id):
    try:
        profil = Profil.objects.get(id=id)
        return render(request, 'profil.html', {'profil': profil})
    except Profil.DoesNotExist:
        return redirect('accueil')  # nom de ton URL vers le formulaire de création

@login_required
def profil_edit(request):
    if request.method == 'POST':
        form = ProfilForm(request.POST)
        if form.is_valid():
            profil = form.save(commit=False)
            profil.utilisateur = request.user  # Associer le profil à l'utilisateur connecté
            profil.date_inscription = datetime.now()
            profil.pseudo = form.cleaned_data['pseudo']
            profil.bio = form.cleaned_data['bio']
            profil.save()
            return redirect('accueil')
    else:
        form = ProfilForm()
    # return render(request, 'edit.html')
    return render(request, 'edit.html', {'form': form})

# # Creating a form to add an article.
# >>> form = ArticleForm()

# # Creating a form to change an existing article.
# >>> article = Article.objects.get(pk=1)
# >>> form = ArticleForm(instance=article)

