from django.contrib import admin
from accounts.models import AdminProfile, ClientProfile, CompanyProfile

admin.site.register([AdminProfile, ClientProfile, CompanyProfile])