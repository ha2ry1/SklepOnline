from rest_framework import generics
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import ast

# Create your views here.
#widoki, inaczej mówiąc kontrolery odpowiedzialny za obsługę żądań od użytkownika, przetwarzanie logiki biznesowej oraz aktualizację bazy danych.

@csrf_exempt
def register_view(request):
    data = ast.literal_eval(request.body.decode('utf-8'))
    
    username = data.get('username', '')
    password = data.get('password', '')
    email = data.get('email', '')
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    location = data.get('location', '')
    
    
    if not username or not password:
        return JsonResponse({'message': 'Wszystkie pola są wymagane'}, status=400)

    # Sprawdź, czy użytkownik o podanej nazwie już istnieje
    if User.objects.filter(username=username).exists():
        return JsonResponse({'message': 'Użytkownik już istnieje'}, status=400)

    # Utwórz nowego użytkownika
    user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email)
    user.set_password(password) #Metoda haszuje hasło
    user.save()
    user_prof = UserProfile(location=location, user_id=user.id)
    user_prof.save()
    return JsonResponse({'message': 'Rejestracja zakończona sukcesem'})

@csrf_exempt
def login_view(request):
    #do logowania wystarczy nazwa użytkownika i hasło
    data = ast.literal_eval(request.body.decode('utf-8'))
    username = data.get('username', '')
    password = data.get('password', '')
    user = authenticate(request, username=username, password=password)#Weryfikacja w bazie
    print(user)
    if user is not None:
        login(request, user)#logowanie, zmiana stanu na zalogowany w systemie
        return JsonResponse({'message': 'Zalogowano pomyślnie'})
    else:
        return JsonResponse({'message': 'Błędny login lub hasło'}, status=401)

def get_all_item(request):
    if request.method == 'GET':
        try:
            items = Item.objects.all()
            items_data = [{"id": item.id, "name": item.name, "descript": item.descript, "price": item.price, "category": item.category.name} for item in items]
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
    print(request)
    if request.method == 'POST':
        #print(request.body.decode('utf-8'))
        data = ast.literal_eval(request.body.decode('utf-8'))
        name = data.get('name', '')
        descript = data.get('descript', '')
        category = data.get('category', '')
        price = data.get('price', '')
        print(name, descript, category, price)
        if name and descript and category and price:
            try:
                category = Category.objects.filter(name=category)[0]
                new_item = Item.objects.create(name=name, descript=descript, price=price, category=category)
            except Exception as e: 
                print(e)
            return JsonResponse({"message": "Przedmiot dodany do bazy"})
        else:
            return JsonResponse({"error": "Brakuje danych do wprowadzenia przedmiotu"}, status=400)
    else:
        return JsonResponse({"error": "Nieprawidłowa metoda na zasobie"}, status=405)

class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    http_method_names = ['get']
    
        
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    #http_method_names = ['get']
    

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer    

'''
class SaleListCreateView(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
'''
