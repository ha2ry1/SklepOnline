from rest_framework import generics
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
#widoki, inaczej mówiąc kontrolery odpowiedzialny za obsługę żądań od użytkownika, przetwarzanie logiki biznesowej oraz aktualizację bazy danych.

@csrf_exempt
@require_POST
def registration_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    location = requset.POST.get('location')

    if not username or not password:
        return JsonResponse({'message': 'Wszystkie pola są wymagane'}, status=400)

    # Sprawdź, czy użytkownik o podanej nazwie już istnieje
    if User.objects.filter(username=username).exists():
        return JsonResponse({'message': 'Użytkownik już istnieje'}, status=400)

    # Utwórz nowego użytkownika
    user = User.objects.create_user(username=username, password=password, email=email)
    user_prof = UserProfile(location=location, user_id=user.id)
    user_prof.save()
    return JsonResponse({'message': 'Rejestracja zakończona sukcesem'})

@csrf_exempt
@require_POST
def new_user(request):
    #do logowania wystarczy nazwa użytkownika i hasło
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(request, username=username, password=password)#Weryfikacja w bazie

    if user is not None:
        login(request, user)#logowanie, zmiana stanu na zalogowany w systemie
        return JsonResponse({'message': 'Zalogowano pomyślnie'})
    else:
        return JsonResponse({'message': 'Błędny login lub hasło'}, status=401)

def get_all_item(request):
    if request.method == 'GET':
        try:
            items = Item.objects.all()
            items_data = [{"id": item.id, "name": item.name, "descript": item.descript, "category": item.category.name} for item in items]
            return JsonResponse({"items": items_data})
        except Exception as e:
            return JsonResponse({"error": f"Błąd związany z : {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Nieprawidłowa metoda na zasobie"}, status=405)
    
def get_item_by_id(request, item_id):
    if request.method == 'GET':
        try:
            item = Item.objects.get(id=item_id)
            item_data = {"id": item.id, "name": item.name, "descript": item.descript, "category": item.category.name}
            return JsonResponse({"item": item_data})
        except Exception as e:
            return JsonResponse({"error": f"Błąd związany z : {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Nieprawidłowa metoda na zasobie"}, status=405)
        
@csrf_exempt
def add_item(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        name = data.get('name', '')
        descript = data.get('descript', '')
        category = data.get('category', '')

        if name and description and category:
            new_item = Item.objects.create(name=name, description=description, category=category)
            return JsonResponse({"message": "Przedmiot dodany do bazy"})
        else:
            return JsonResponse({"error": "Name and description are required"}, status=400)
    else:
        return JsonResponse({"error": "Nieprawidłowa metoda na zasobie"}, status=405)

class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    http_method_names = ['get']
    
        
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']
    

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer    

'''
class SaleListCreateView(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
'''
