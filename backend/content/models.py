from django.db import models


class SiteContent(models.Model):
    content = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Site content'
