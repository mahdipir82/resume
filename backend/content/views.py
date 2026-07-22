from django.contrib.auth import authenticate, get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .defaults import DEFAULT_SITE_CONTENT
from .models import Project, SiteContent
from .project_defaults import DEFAULT_PROJECTS


PROJECT_FIELDS = [
    'title',
    'persian_title',
    'short_description',
    'full_description',
    'image',
    'image_alt',
    'technologies',
    'features',
    'github_url',
    'live_url',
    'status',
    'featured',
    'sort_order',
]


def get_singleton_content():
    site_content, _ = SiteContent.objects.get_or_create(
        id=1,
        defaults={'content': DEFAULT_SITE_CONTENT},
    )

    merged_content = {**DEFAULT_SITE_CONTENT, **(site_content.content or {})}

    if merged_content != site_content.content:
        site_content.content = merged_content
        site_content.save(update_fields=['content', 'updated_at'])

    return site_content


def admin_exists():
    return get_user_model().objects.filter(username='admin').exists()


def serialize_project(project):
    return {
        'id': project.id,
        'title': project.title,
        'persianTitle': project.persian_title,
        'shortDescription': project.short_description,
        'fullDescription': project.full_description,
        'image': project.image,
        'imageAlt': project.image_alt,
        'technologies': project.technologies,
        'features': project.features,
        'githubUrl': project.github_url,
        'liveUrl': project.live_url,
        'status': project.status,
        'featured': project.featured,
        'sortOrder': project.sort_order,
    }


def normalize_project_payload(payload):
    return {
        'title': payload.get('title', '').strip(),
        'persian_title': payload.get('persianTitle', '').strip(),
        'short_description': payload.get('shortDescription', '').strip(),
        'full_description': payload.get('fullDescription', '').strip(),
        'image': payload.get('image', '').strip(),
        'image_alt': payload.get('imageAlt', '').strip(),
        'technologies': payload.get('technologies', []),
        'features': payload.get('features', []),
        'github_url': payload.get('githubUrl', '').strip(),
        'live_url': payload.get('liveUrl', '').strip(),
        'status': payload.get('status', 'در حال توسعه').strip(),
        'featured': bool(payload.get('featured', False)),
        'sort_order': int(payload.get('sortOrder') or 0),
    }


def validate_project_payload(data):
    required_fields = ['title', 'persian_title', 'short_description', 'full_description']
    missing_fields = [field for field in required_fields if not data[field]]

    if missing_fields:
        return 'عنوان، عنوان فارسی، توضیح کوتاه و توضیح کامل الزامی هستند.'

    if not isinstance(data['technologies'], list) or not isinstance(data['features'], list):
        return 'فناوری‌ها و ویژگی‌ها باید آرایه باشند.'

    return ''


def seed_projects_if_empty():
    if Project.objects.exists():
        return

    for project_data in DEFAULT_PROJECTS:
        Project.objects.create(**project_data)


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


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def projects(request):
    seed_projects_if_empty()

    if request.method == 'GET':
        return Response([serialize_project(project) for project in Project.objects.all()])

    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    project_data = normalize_project_payload(request.data)
    validation_error = validate_project_payload(project_data)

    if validation_error:
        return Response({'detail': validation_error}, status=status.HTTP_400_BAD_REQUEST)

    project = Project.objects.create(**project_data)
    return Response(serialize_project(project), status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['PUT', 'DELETE'])
@permission_classes([AllowAny])
def project_detail(request, project_id):
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        project = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return Response({'detail': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    project_data = normalize_project_payload(request.data)
    validation_error = validate_project_payload(project_data)

    if validation_error:
        return Response({'detail': validation_error}, status=status.HTTP_400_BAD_REQUEST)

    for field in PROJECT_FIELDS:
        setattr(project, field, project_data[field])

    project.save()
    return Response(serialize_project(project))
