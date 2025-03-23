from django.contrib import admin
from django.urls import path
from .views import BookView, AllBooksView, LoginView, SignupView, ProfileView

urlpatterns = [
    path('Books/', BookView.as_view(), name='Books'),  
    path('Books/<int:pk>', BookView.as_view(), name='BooksDetail'),  
    path('AllBooks/', AllBooksView.as_view(), name='AllBooks'), 
    path('Login/', LoginView.as_view(), name='Login'),
    path('Signup/', SignupView.as_view(), name='Signup'),
    path('Profile/', ProfileView.as_view(), name='profile'),
    path('admin/', admin.site.urls),
]