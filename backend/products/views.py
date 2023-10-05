import os
from django.http import HttpResponse, JsonResponse

from products_api.settings import MEDIA_ROOT
from .models import Section, Category, Products

def products(request):
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
        return JsonResponse({'error': 'Productos no encontrados'}, status=404)


def section(request):
  section_name = request.GET.get('section')

  categories_section = Category.objects.filter(sectioncategory__section=section_name).values()

  sectionJson = []
  for category in categories_section:
    products = list(Products.objects.filter(category_id = category['category']).values())
    sectionJson.extend(products)
    
  try:
    return JsonResponse(sectionJson, safe=False)
  except Products.DoesNotExist:
    return JsonResponse({section_name: 'Productos no encontrados'}, status=404)


def image(request):
  image_name = request.GET.get('image')
    
  path_images = os.path.join(MEDIA_ROOT, 'images')

  path_image = os.path.join(path_images, image_name.replace('%20', ' '))
  print(path_image)

  if os.path.exists(path_image):
      with open(path_image, 'rb') as imagen:
          return HttpResponse(imagen.read(), content_type='image/jpeg')
  else:
      return HttpResponse('Imagen no encontrada', status=404)
    
def section_list(request):
    section = list(Section.objects.all().values())
    return JsonResponse(section, safe=False)

def category_list(request):
    section_name = request.GET.get('list')
    category = list(Category.objects.filter(sectioncategory__section=section_name).values())
    return JsonResponse(category, safe=False)

def sub_category_list(request):
    categoria_deseada = request.GET.get('list')
    
    subcategorias = Products.objects.filter(category__category=categoria_deseada).values('sub_category').distinct()
    nombres_subcategorias = [sub['sub_category'] for sub in subcategorias]
    
    return JsonResponse(nombres_subcategorias, safe=False)