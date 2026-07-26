from django.db import migrations


def update_default_favicon(apps, schema_editor):
    SiteContent = apps.get_model('content', 'SiteContent')

    for site_content in SiteContent.objects.all():
        content = dict(site_content.content or {})

        if content.get('faviconUrl') == '/favicon.svg':
            content['faviconUrl'] = '/favicon.ico'
            site_content.content = content
            site_content.save(update_fields=['content'])


def restore_default_favicon(apps, schema_editor):
    SiteContent = apps.get_model('content', 'SiteContent')

    for site_content in SiteContent.objects.all():
        content = dict(site_content.content or {})

        if content.get('faviconUrl') == '/favicon.ico':
            content['faviconUrl'] = '/favicon.svg'
            site_content.content = content
            site_content.save(update_fields=['content'])


class Migration(migrations.Migration):
    dependencies = [
        ('content', '0004_timelineitem'),
    ]

    operations = [
        migrations.RunPython(update_default_favicon, restore_default_favicon),
    ]
