from django.http import HttpResponse, JsonResponse
from .models import Section, Category, Products

def products(request):
    product_id = request.GET.get('id')
    sub_category = request.GET.get('sub_category')
    product = request.GET.get('name')
    price = request.GET.get('price')

    filter_kwargs = {}

    if product_id:
        filter_kwargs['product_id'] = product_id

    if sub_category:
        filter_kwargs['sub_category'] = sub_category
        
    if product:
        filter_kwargs['price'] = product
        
    if price:
        filter_kwargs['price'] = price

    try:
        products = Products.objects.filter(**filter_kwargs).values()
        return JsonResponse(list(products), safe=False)
    except Products.DoesNotExist:
        return JsonResponse({'error': 'Productos no encontrados'}, status=404)


def section(request):
  section_name = request.GET.get('section')

  categorias_en_seccion = Category.objects.filter(sectioncategory__section=section_name).values()

  sectionJson = {}
  for category in categorias_en_seccion:
    print(category['category'])
    products = list(Products.objects.filter(category_id = category['category']).values())
    
    sectionJson[category['category']] = products
    
  try:
    return JsonResponse({section_name: sectionJson}, safe=False)
  except Products.DoesNotExist:
    return JsonResponse({section_name: 'Productos no encontrados'}, status=404)
