import json
import os
from django.db import connection

from django.http import HttpResponse, HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from products_api.settings import MEDIA_ROOT
from .forms import Products_Form
from .models import Section, Category, Products

def products(request: HttpRequest):
    product_id = request.GET.get('id')
    category = request.GET.get('category')
    sub_category = request.GET.get('sub-category')
    product = request.GET.get('name')
    price = request.GET.get('price')

    filter_kwargs = {}

    if product_id:
        filter_kwargs['product_id'] = product_id
        
    if category:
        filter_kwargs['category_id'] = category

    if sub_category:
        filter_kwargs['sub_category'] = sub_category
        
    if product:
        filter_kwargs['product'] = product
        
    if price:
        filter_kwargs['price'] = price

    try:
        if (product):
            products = Products.objects.filter(product__icontains=product).values()
        else:
            products = Products.objects.filter(**filter_kwargs).values()
            
        return JsonResponse(list(products), safe=False)
    except Products.DoesNotExist:
        return JsonResponse({'error': 'No products found'}, status=404)


def section(request: HttpRequest):
  section_name = request.GET.get('section')

  categories_section = Category.objects.filter(sectioncategory__section=section_name).values()

  sectionJson = []
  for category in categories_section:
    products = list(Products.objects.filter(category_id = category['category']).values())
    sectionJson.extend(products)
    
  try:
    return JsonResponse(sectionJson, safe=False)
  except Products.DoesNotExist:
    return JsonResponse({section_name: 'No products found'}, status=404)


def image(request: HttpRequest):
  image_name = request.GET.get('image')
    
  path_images = os.path.join(MEDIA_ROOT, 'images')

  path_image = os.path.join(path_images, image_name.replace('%20', ' '))
  print(path_image)

  if os.path.exists(path_image):
      with open(path_image, 'rb') as imagen:
          return HttpResponse(imagen.read(), content_type='image/jpeg')
  else:
      return HttpResponse('Imagen no encontrada', status=404)
    
    
def section_list(request: HttpRequest):
    sections = list(Section.objects.all().values())
    sections_names = [section['section'] for section in sections]
    return JsonResponse(sections_names, safe=False)


def category_list(request: HttpRequest):
    section_name = request.GET.get('list')
    categories = list(Category.objects.filter(sectioncategory__section=section_name).values())
    categories_names = [category['category'] for category in categories]
    return JsonResponse(categories_names, safe=False)


def sub_category_list(request: HttpRequest):
    category = request.GET.get('list')
    
    sub_categories = Products.objects.filter(category__category=category).values('sub_category').distinct()
    sub_categories_names = [sub['sub_category'] for sub in sub_categories]
    
    return JsonResponse(sub_categories_names, safe=False)


@csrf_exempt
def insert_products(request: HttpRequest):
    if request.method == 'POST':
        data = json.loads(request.body)
        products_info = Products_Form(data)
        
        if products_info.is_valid():
            product = Products(
                sub_category = products_info.cleaned_data['sub_category'],
                category = Category.objects.get(category = products_info.cleaned_data['category_id']),
                product = products_info.cleaned_data['product'],
                alt = products_info.cleaned_data['alt'],
                price = products_info.cleaned_data['price'],
                stock = products_info.cleaned_data['stock'],
                quantity = products_info.cleaned_data['quantity'],
                img = products_info.cleaned_data['img']
            )
            
            product.save()
            response_data = {'message': 'Product saved successfully in the database'}
            return JsonResponse(response_data, status=200)
        else:
            response_data = {'message': 'Invalid form data'}
            return JsonResponse(response_data, status=400)

    
@csrf_exempt
def delete_products(request: HttpRequest):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        if data['postUrl'].isdigit() and data['preUrl'] == 'id':
            id_product = int(data['postUrl'])
            product_detele = Products.objects.get(product_id=id_product)
            product_detele.delete()
            
            response_data = {'message': 'The product was successfully removed'}
            return JsonResponse(response_data, status=200)
        else:
            response_data = {'message': 'An error occurred while deleting the product, please try again'}
            return JsonResponse(response_data, status=400)
        

@csrf_exempt
def query_products(request: HttpRequest):
    if request.method == 'POST':
        rigth_list = ['SELECT', 'CREATE', 'INSERT', 'UPDATE', 'DELETE']
        sql_query = json.loads(request.body)
        
        object_rigths = []
        for index, (rigth, value) in enumerate(sql_query['rigth'].items()):
            
            if value == False:
                object_rigths.append(rigth_list[index])
        
        for object_rigth in object_rigths:
            is_valid = object_rigth.lower() in sql_query['query']
            if is_valid: break
                
        if(sql_query['query'] and not is_valid):
            
            with connection.cursor() as cursor:
                cursor.execute(sql_query['query'])
                results = cursor.fetchall()
                
                columns = [col[0] for col in cursor.description]
                
                response = {'headers': columns, 'content': results}
            
            return JsonResponse(response, safe=False)
        else:
            return JsonResponse({'message': 'You do not have the rights to make this query'}, safe=False)


@csrf_exempt        
def update_products(request: HttpRequest):
    if request.method == 'PATCH':
        new_data = json.loads(request.body)
        
        producto = Products.objects.get(product_id=new_data[0])
        
        producto.sub_category = new_data[1]
        producto.product = new_data[2]
        producto.alt = new_data[3]
        producto.price = new_data[4]
        producto.stock = new_data[5]
        producto.quantity = new_data[6]
        producto.img = new_data[7]
        producto.category.category = new_data[8]
        
        producto.save()
        
        return JsonResponse({'message': 'Product data updated successfully'}, safe=False)
            
        
    
