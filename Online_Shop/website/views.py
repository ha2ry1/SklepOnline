from rest_framework import generics
from .models import *
from .serializers import *

# Create your views here.
#widoki, inaczej mówiąc kontrolery odpowiedzialny za obsługę żądań od użytkownika, przetwarzanie logiki biznesowej oraz aktualizację bazy danych.


class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    
        
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']
    

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer    

class SaleListCreateView(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
