from django.shortcuts import render

from django.http import JsonResponse

def my_view(request):
    data = {'message': 'Hello from Django!'}
    return JsonResponse(data)