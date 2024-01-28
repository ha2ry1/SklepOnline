from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model): #Profil użytkownika, rozszerzenie wbudowanej klasy User, wzbogacone o dane osoby, awatar itd.
    user = models.OneToOneField(User, on_delete=models.CASCADE) #Odwołanie do wbudowanej klasy User
    location = models.TextField(blank=True) #lokalizacja przybliżona np. Warszawa, Gdańsk, Kraków itd.
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True) #zdjęcie profilowe 

    def __str__(self):
        return self.user.username



class Category(models.Model): #Kategoria przedmiotu (np. elektronika, kosmetyki, akcesoria itd.)
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class OrderStatus(models.Model): #Status zakupu (np. w trakcie wybierania, oczekuje na płatność, zrealizowano)
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name


class Item(models.Model): #Przedmiot wystawiany na sprzedaż
    name = models.CharField(max_length=255)
    descript = models.TextField(blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE) #wskazanie kategori przedmiotu, jedna kategoria może być przypisana do wielu przedmiotów
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(default="")
    avaible = models.BooleanField(default=True)
    
    def __str__(self):
        return str(self.id)+". "+self.name
 
'''class Sale(models.Model):
    item = models.OneToOneField(Item, on_delete=models.CASCADE) #wskazanie do przedmiotu, którego dotyczy sprzedaż
    seller = models.ForeignKey(UserProfile, on_delete=models.CASCADE) #wskazanie do sprzedawcy, jeden sprzedawca może wystawić kilka przedmiotów
    avaible = models.IntegerField() #liczba dostępnych sztuk przedmiotu
    price = models.DecimalField(max_digits=10, decimal_places=2) #cena za sztukę towaru
    is_active = models.BooleanField(default=True) #czy ogłoszenie jest aktywne, jeżeli nie to nie powinno zostać wyświetlane
    #qr_code
    
    
    def __str__(self):
        return str(self.item.name) + ": $" + str(self.price)
'''


class Order(models.Model): #W przypadku wprowadzania adresu odbioru (np. paczkomat) wszystkie adresy mają zostać zapamiętane
    customer = models.OneToOneField(Item, on_delete=models.CASCADE) #Kupujący
    order_data = models.DateTimeField(auto_now_add=True) #data zakupu
    address = models.CharField(max_length=255) #adres dostawy
    status = models.ForeignKey(OrderStatus, on_delete=models.CASCADE, null=True)

class OrderItems(models.Model): #Pozycja zamówienia
    item = models.ForeignKey(Item, on_delete=models.CASCADE) #wskazanie na kupywany przedmiot
    quantity = models.IntegerField() #liczba kupowanych przedmiotów
    order = models.ForeignKey(Order, on_delete=models.CASCADE) #wskazanie zakupu
    
    def __str__(self):
        return str(self.item.name) + ": $" + str(self.quantity)