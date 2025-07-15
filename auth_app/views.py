from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .form import CustomUserCreationForm
import requests

# 🔐 Page d'inscription
def inscription(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('connexion')
    else:
        form = CustomUserCreationForm()
    return render(request, 'inscription.html', {'form': form})

# 🔐 Page de connexion
def connexion(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('accueil')
        else:
            messages.error(request, "Nom d'utilisateur ou mot de passe incorrect.")
    return render(request, 'connexion.html')

# 🔓 Déconnexion
def deconnexion(request):
    logout(request)
    return redirect('accueil')

# 🏠 Page d'accueil avec carrousel de films
# @login_required
def accueil(request):
    api_key = '4d8cc5cf089bc265b2059b1489629cc1'
    films = []

    # Charger plusieurs pages de résultats
    for page in range(1, 4):  # ➜ 60 films environ (3 pages de 20)
        url = f'https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=fr&page={page}'
        response = requests.get(url).json()
        films += response.get('results', [])

    return render(request, 'accueil.html', {'films': films})

def recherche(request):
    query = request.GET.get('q')
    api_key = '4d8cc5cf089bc265b2059b1489629cc1'

    if not query:
        return render(request, 'recherche.html', {'films': [], 'acteurs': []})

    # Recherche multi (films, séries, personnes)
    url = f'https://api.themoviedb.org/3/search/multi?api_key={api_key}&language=fr&query={query}'
    response = requests.get(url).json()
    results = response.get('results', [])

    films = [item for item in results if item.get('media_type') == 'movie']
    acteurs = [item for item in results if item.get('media_type') == 'person']

    return render(request, 'recherche.html', {
        'films': films,
        'acteurs': acteurs,
        'query': query
    })
