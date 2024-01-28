from django.urls import path, include
from .views import *
from django.conf.urls.static import static
from django.conf import settings

#Ruting, odpowieda za przekierowanie z adresu URL do odpowiedniej metody w widoku views

urlpatterns = [
    #path('test/', CategoryListCreateView.get_current_path, name='test-list'),
    path('user/', UserProfileListCreateView.as_view(), name='user-list'),
    path('category/', CategoryListCreateView.as_view(), name='category-list'),
    #path('api/condition/', ConditionListCreateView.as_view(), name='condition-list'),
    path('item/', ItemListCreateView.as_view(), name='item-list'),
    path('register', register_view, name="rejestracja"),
    path('login', login_view, name='login'),
    #path('api/sale/', SaleListCreateView.as_view(), name='sale-list'),
    path('item_all/',get_all_item, name="items"),
    path('item/<int:item_id>',get_item_by_id, name="item_by_id"),
    path('item_add',add_item, name="add_item"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
