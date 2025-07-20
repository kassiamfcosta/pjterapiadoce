from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)
from .models import AdminProfile, ClientProfile, CompanyProfile
from .serializers import (
    AdminProfileSerializer, ClientProfileSerializer, CompanyProfileSerializer
)

# Admin
class AdminProfileListCreateAPIView(ListCreateAPIView):
    queryset = AdminProfile.objects.all()
    serializer_class = AdminProfileSerializer

class AdminProfileRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = AdminProfile.objects.all()
    serializer_class = AdminProfileSerializer

# Cliente
class ClientProfileListCreateAPIView(ListCreateAPIView):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer

class ClientProfileRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer

# Empresa
class CompanyProfileListCreateAPIView(ListCreateAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer

class CompanyProfileRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer