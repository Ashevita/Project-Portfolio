from django.contrib import admin
from django.urls import path
from auth_app import views as auth_views
from review_app import views as review_views
from Findmovie import views as findmovie_views
from profil import views as profil_views
from auth_app import views as recherche_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('inscription', auth_views.inscription, name='inscription'),
    path('connexion/', auth_views.connexion, name='connexion'),
    path('', auth_views.accueil, name='accueil'),
    path('deconnexion/', auth_views.deconnexion, name='deconnexion'),
    path('reviews/', review_views.reviews, name='reviews'),
    path('random_movie/', findmovie_views.random_movie, name='random_movie'),
    path('profil/<int:id>/', profil_views.profil, name='profil'),
    path('profil/edit/', profil_views.profil_edit, name='profil_edit'),
    path('recherche/', recherche_views.recherche, name='recherche'),
    path('film/<int:id>/', findmovie_views.film_detail, name='film_detail'),
    path('acteur/<int:id>/', findmovie_views.acteur_detail, name='acteur_detail')

]
