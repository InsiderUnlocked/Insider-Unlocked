from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'congress-trades', views.AllCongressViewSet, basename='congressAll')

router.register(r'congress-person', views.CongressPersonViewSet, basename='congressPerson')

router.register(r'ticker', views.TickerViewSet, basename='Ticker')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('government/', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]