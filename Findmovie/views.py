import requests
import random
from django.shortcuts import render

TMDB_API_KEY = '4d8cc5cf089bc265b2059b1489629cc1'

def random_movie(request):
    genre = request.GET.get("genre")
    note = request.GET.get("note")
    annee = request.GET.get("annee")
    acteur = request.GET.get("acteur")
    pays = request.GET.get("pays")



    params = {
        "api_key": TMDB_API_KEY,
        "language": "fr-FR",
        "sort_by": "popularity.desc",
        "include_adult": False,
        "with_genres": genre,
        "vote_average.gte": note,
        "primary_release_year": annee,
        "with_origin_country": pays
    }


    if acteur:
        # Chercher l'ID de l'acteur
        search_url = "https://api.themoviedb.org/3/search/person"
        r = requests.get(search_url, params={"api_key": TMDB_API_KEY, "query": acteur})
        data = r.json()
        if data["results"]:
            actor_id = data["results"][0]["id"]
            params["with_cast"] = actor_id

    # Récupérer les films
    discover_url = "https://api.themoviedb.org/3/discover/movie"
    r = requests.get(discover_url, params=params)
    movies = r.json().get("results", [])

    # Choisir un film au hasard
    chosen = random.choice(movies) if movies else None


    trailer_url = None
    if chosen:
        video_req = requests.get(f"https://api.themoviedb.org/3/movie/{chosen['id']}/videos", params={
            "api_key": TMDB_API_KEY,
            "language": "fr-FR"
        })
        videos = video_req.json().get("results", [])
        trailer = next((v for v in videos if v["type"] == "Trailer" and v["site"] == "YouTube"), None)
        if trailer:
            trailer_url = f"https://www.youtube.com/embed/{trailer['key']}"

    return render(request, "random.html", {"film": chosen, "trailer_url": trailer_url})

def film_detail(request, id):
    # Tu peux y mettre les appels à l'API plus tard
    return render(request, 'film_detail.html', {'film_id': id})
def acteur_detail(request, id):
    api_key = '4d8cc5cf089bc265b2059b1489629cc1'

    # Infos de la personne
    person_url = f'https://api.themoviedb.org/3/person/{id}?api_key={api_key}&language=fr'
    credits_url = f'https://api.themoviedb.org/3/person/{id}/movie_credits?api_key={api_key}&language=fr'

    person = requests.get(person_url).json()
    credits = requests.get(credits_url).json()

    films = sorted(credits.get('cast', []), key=lambda x: x.get('release_date', ''), reverse=True)

    return render(request, 'acteur_detail.html', {
        'acteur': person,
        'films': films
    })
