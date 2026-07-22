from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('content', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=160)),
                ('persian_title', models.CharField(max_length=200)),
                ('short_description', models.TextField()),
                ('full_description', models.TextField()),
                ('image', models.URLField(blank=True)),
                ('image_alt', models.CharField(blank=True, max_length=240)),
                ('technologies', models.JSONField(default=list)),
                ('features', models.JSONField(default=list)),
                ('github_url', models.URLField(blank=True)),
                ('live_url', models.URLField(blank=True)),
                ('status', models.CharField(default='در حال توسعه', max_length=80)),
                ('featured', models.BooleanField(default=False)),
                ('sort_order', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['sort_order', '-created_at'],
            },
        ),
    ]
