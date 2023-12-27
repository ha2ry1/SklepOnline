from django.urls import path
from .views import *

#Ruting, odpowieda za przekierowanie z adresu URL do odpowiedniej metody w widoku views

urlpatterns = [
    #path('test/', CategoryListCreateView.get_current_path, name='test-list'),
    path('api/user/', UserProfileListCreateView.as_view(), name='user-list'),
    path('api/category/', CategoryListCreateView.as_view(), name='category-list'),
    #path('api/condition/', ConditionListCreateView.as_view(), name='condition-list'),
    path('api/item/', ItemListCreateView.as_view(), name='item-list'),
    #path('api/sale/', SaleListCreateView.as_view(), name='sale-list'),
    
]
