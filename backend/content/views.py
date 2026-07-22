from django.contrib.auth import authenticate, get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import SiteContent
from .defaults import DEFAULT_SITE_CONTENT


def get_singleton_content():
    site_content, _ = SiteContent.objects.get_or_create(
        id=1,
        defaults={'content': DEFAULT_SITE_CONTENT},
    )

    if not site_content.content:
      site_content.content = DEFAULT_SITE_CONTENT
      site_content.save(update_fields=['content', 'updated_at'])

    return site_content


def admin_exists():
    return get_user_model().objects.filter(username='admin').exists()


@api_view(['GET'])
@permission_classes([AllowAny])
def admin_status(request):
    return Response({
        'hasPassword': admin_exists(),
        'authenticated': request.user.is_authenticated,
    })


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def admin_setup(request):
    if admin_exists():
        return Response({'detail': 'Admin password already exists.'}, status=status.HTTP_409_CONFLICT)

    password = request.data.get('password', '')

    if len(password) < 8:
        return Response({'detail': 'Password must be at least 8 characters.'}, status=status.HTTP_400_BAD_REQUEST)

    User = get_user_model()
    user = User.objects.create_user(username='admin', password=password, is_staff=True, is_superuser=True)
    login(request, user)

    return Response({'authenticated': True, 'hasPassword': True})


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    password = request.data.get('password', '')
    user = authenticate(request, username='admin', password=password)

    if user is None:
        return Response({'detail': 'Invalid password.'}, status=status.HTTP_401_UNAUTHORIZED)

    login(request, user)
    return Response({'authenticated': True, 'hasPassword': True})


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def admin_logout(request):
    logout(request)
    return Response({'authenticated': False})


@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])
def site_content(request):
    site_content_object = get_singleton_content()

    if request.method == 'GET':
        return Response(site_content_object.content)

    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    site_content_object.content = request.data
    site_content_object.save(update_fields=['content', 'updated_at'])
    return Response(site_content_object.content)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_site_content(request):
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    site_content_object = get_singleton_content()
    site_content_object.content = DEFAULT_SITE_CONTENT
    site_content_object.save(update_fields=['content', 'updated_at'])
    return Response(site_content_object.content)
