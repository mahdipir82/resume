from django.urls import path

from . import views

urlpatterns = [
    path('admin/status/', views.admin_status),
    path('admin/setup/', views.admin_setup),
    path('admin/login/', views.admin_login),
    path('admin/logout/', views.admin_logout),
    path('projects/', views.projects),
    path('projects/<int:project_id>/', views.project_detail),
    path('site-content/', views.site_content),
    path('site-content/reset/', views.reset_site_content),
]
