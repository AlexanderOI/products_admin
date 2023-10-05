from django.db import models

class Section(models.Model):
  section = models.CharField(max_length=255, primary_key=True)

class Category(models.Model):
  category = models.CharField(max_length=255, primary_key=True)

class SectionCategory(models.Model):
  section = models.ForeignKey(Section, on_delete=models.CASCADE)
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
class Products(models.Model):
  product_id = models.IntegerField(primary_key=True)
  sub_category = models.CharField(max_length=255)
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
  product = models.CharField(max_length=255)
  alt = models.CharField(max_length=255)
  price = models.FloatField()
  stock = models.IntegerField()
  quantity = models.IntegerField()
  img = models.CharField(max_length=255)