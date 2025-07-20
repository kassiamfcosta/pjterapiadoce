from django.db import models

class AdminProfile(models.Model):
    ROLE_CHOICES = [
        ('gestor', 'Gestor'),
        ('confeiteiro', 'Confeiteiro'),
        ('vendedor', 'Vendedor'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.name} ({self.role})"

class ClientProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.name

class CompanyProfile(models.Model):
    name = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=20, unique=True)
    address = models.TextField(blank=True)
    contact_email = models.EmailField()

    def __str__(self):
        return self.name