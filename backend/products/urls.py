from django.urls import path

from . import views

urlpatterns = [
  path('product/', views.products, name='product'),
  path('section/', views.section, name='section'),
  path('section/list', views.section_list, name='section_list'),
  path('category/', views.category_list, name='category_list'),
  path('sub-category/', views.sub_category_list, name='sub_category_list'),
  path('media/images/', views.image, name='images'),
  path('insert/', views.insert_products, name='insert'),
  path('delete/', views.delete_products, name='delete')
]