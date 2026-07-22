from django.contrib.auth import authenticate, get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .defaults import DEFAULT_SITE_CONTENT
from .models import Project, SiteContent, SkillGroup, TimelineItem
from .project_defaults import DEFAULT_PROJECTS
from .skill_defaults import DEFAULT_SKILL_GROUPS
from .timeline_defaults import DEFAULT_TIMELINE_ITEMS


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

SKILL_GROUP_FIELDS = [
    'title',
    'icon',
    'skills',
    'sort_order',
]

TIMELINE_ITEM_FIELDS = [
    'title',
    'description',
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
    return get_user_model().objects.filter(is_superuser=True).exists()


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


def serialize_skill_group(skill_group):
    return {
        'id': skill_group.id,
        'title': skill_group.title,
        'icon': skill_group.icon,
        'skills': skill_group.skills,
        'sortOrder': skill_group.sort_order,
    }


def normalize_skill_group_payload(payload):
    skills = []

    if isinstance(payload.get('skills', []), list):
        for skill in payload.get('skills', []):
            if not isinstance(skill, dict):
                continue

            name = str(skill.get('name', '')).strip()
            level = str(skill.get('level', '')).strip()

            if name:
                skills.append({'name': name, 'level': level})

    return {
        'title': payload.get('title', '').strip(),
        'icon': payload.get('icon', 'code').strip() or 'code',
        'skills': skills,
        'sort_order': int(payload.get('sortOrder') or 0),
    }


def validate_skill_group_payload(data):
    if not data['title']:
        return 'عنوان دسته مهارت الزامی است.'

    if not isinstance(data['skills'], list):
        return 'مهارت‌ها باید آرایه باشند.'

    for skill in data['skills']:
        if not isinstance(skill, dict) or not skill.get('name', '').strip():
            return 'نام هر مهارت الزامی است.'

    return ''


def seed_skill_groups_if_empty():
    if SkillGroup.objects.exists():
        return

    for skill_group_data in DEFAULT_SKILL_GROUPS:
        SkillGroup.objects.create(**skill_group_data)


def serialize_timeline_item(timeline_item):
    return {
        'id': timeline_item.id,
        'title': timeline_item.title,
        'description': timeline_item.description,
        'sortOrder': timeline_item.sort_order,
    }


def normalize_timeline_item_payload(payload):
    return {
        'title': payload.get('title', '').strip(),
        'description': payload.get('description', '').strip(),
        'sort_order': int(payload.get('sortOrder') or 0),
    }


def validate_timeline_item_payload(data):
    if not data['title']:
        return 'عنوان مرحله مسیر یادگیری الزامی است.'

    return ''


def seed_timeline_items_if_empty():
    if TimelineItem.objects.exists():
        return

    for timeline_item_data in DEFAULT_TIMELINE_ITEMS:
        TimelineItem.objects.create(**timeline_item_data)


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

    username = request.data.get('username', 'admin').strip() or 'admin'
    password = request.data.get('password', '')

    if len(username) < 3:
        return Response({'detail': 'Username must be at least 3 characters.'}, status=status.HTTP_400_BAD_REQUEST)

    if len(password) < 8:
        return Response({'detail': 'Password must be at least 8 characters.'}, status=status.HTTP_400_BAD_REQUEST)

    User = get_user_model()
    user = User.objects.create_user(username=username, password=password, is_staff=True, is_superuser=True)
    login(request, user)

    return Response({'authenticated': True, 'hasPassword': True})


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '')
    user = authenticate(request, username=username, password=password)

    if user is None:
        return Response({'detail': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

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

    next_content = {**DEFAULT_SITE_CONTENT, **dict(request.data)}
    site_content_object.content = next_content
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


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def skill_groups(request):
    seed_skill_groups_if_empty()

    if request.method == 'GET':
        return Response([serialize_skill_group(skill_group) for skill_group in SkillGroup.objects.all()])

    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    skill_group_data = normalize_skill_group_payload(request.data)
    validation_error = validate_skill_group_payload(skill_group_data)

    if validation_error:
        return Response({'detail': validation_error}, status=status.HTTP_400_BAD_REQUEST)

    skill_group = SkillGroup.objects.create(**skill_group_data)
    return Response(serialize_skill_group(skill_group), status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['PUT', 'DELETE'])
@permission_classes([AllowAny])
def skill_group_detail(request, skill_group_id):
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        skill_group = SkillGroup.objects.get(id=skill_group_id)
    except SkillGroup.DoesNotExist:
        return Response({'detail': 'Skill group not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        skill_group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    skill_group_data = normalize_skill_group_payload(request.data)
    validation_error = validate_skill_group_payload(skill_group_data)

    if validation_error:
        return Response({'detail': validation_error}, status=status.HTTP_400_BAD_REQUEST)

    for field in SKILL_GROUP_FIELDS:
        setattr(skill_group, field, skill_group_data[field])

    skill_group.save()
    return Response(serialize_skill_group(skill_group))


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def timeline_items(request):
    seed_timeline_items_if_empty()

    if request.method == 'GET':
        return Response([serialize_timeline_item(item) for item in TimelineItem.objects.all()])

    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    timeline_item_data = normalize_timeline_item_payload(request.data)
    validation_error = validate_timeline_item_payload(timeline_item_data)

    if validation_error:
        return Response({'detail': validation_error}, status=status.HTTP_400_BAD_REQUEST)

    timeline_item = TimelineItem.objects.create(**timeline_item_data)
    return Response(serialize_timeline_item(timeline_item), status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['PUT', 'DELETE'])
@permission_classes([AllowAny])
def timeline_item_detail(request, timeline_item_id):
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        timeline_item = TimelineItem.objects.get(id=timeline_item_id)
    except TimelineItem.DoesNotExist:
        return Response({'detail': 'Timeline item not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        timeline_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    timeline_item_data = normalize_timeline_item_payload(request.data)
    validation_error = validate_timeline_item_payload(timeline_item_data)

    if validation_error:
        return Response({'detail': validation_error}, status=status.HTTP_400_BAD_REQUEST)

    for field in TIMELINE_ITEM_FIELDS:
        setattr(timeline_item, field, timeline_item_data[field])

    timeline_item.save()
    return Response(serialize_timeline_item(timeline_item))
