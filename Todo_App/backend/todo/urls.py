from django.urls import path
from todo import views

urlpatterns = [
    path('todo/', views.TodoAPI.as_view()),
    path('todo/update/<int:id>/', views.TodoAPI.as_view()),
    path('todo/delete/<int:id>/', views.TodoAPI.as_view()),
]
