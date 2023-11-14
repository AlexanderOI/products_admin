from django import forms

class Products_Form(forms.Form):
  sub_category = forms.CharField(max_length=255)
  category_id = forms.CharField(max_length=255)
  product = forms.CharField(max_length=255)
  alt = forms.CharField(max_length=255)
  price = forms.FloatField()
  stock = forms.IntegerField()
  quantity = forms.IntegerField()
  img = forms.CharField(max_length=255)