from django.db import models


class SiteContent(models.Model):
    content = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Site content'


class Project(models.Model):
    title = models.CharField(max_length=160)
    persian_title = models.CharField(max_length=200)
    short_description = models.TextField()
    full_description = models.TextField()
    image = models.URLField(blank=True)
    image_alt = models.CharField(max_length=240, blank=True)
    technologies = models.JSONField(default=list)
    features = models.JSONField(default=list)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    status = models.CharField(max_length=80, default='در حال توسعه')
    featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['sort_order', '-created_at']

    def __str__(self):
        return self.title
