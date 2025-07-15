from django.shortcuts import render

def reviews(request):
    # This view will handle displaying the reviews
    # For now, we can just render a template
    return render(request, 'reviews.html')
# Create your views here.
