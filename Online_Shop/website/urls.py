from django.urls import path, include
from .views import *

#Ruting, odpowieda za przekierowanie z adresu URL do odpowiedniej metody w widoku views

urlpatterns = [
    #path('test/', CategoryListCreateView.get_current_path, name='test-list'),
    path('user/', UserProfileListCreateView.as_view(), name='user-list'),
    path('category/', CategoryListCreateView.as_view(), name='category-list'),
    #path('api/condition/', ConditionListCreateView.as_view(), name='condition-list'),
    path('item/', ItemListCreateView.as_view(), name='item-list'),
    path('register/', registration_view, name='register'),
    #path('api/sale/', SaleListCreateView.as_view(), name='sale-list'),
    path('item_all/',get_all_item, name="items"),
    path('item/<int:item_id>',get_item_by_id, name="item_by_id"),
]
