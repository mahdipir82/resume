from django.contrib import admin

from .models import Project, SiteContent, SkillGroup, TimelineItem


@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'updated_at')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'persian_title', 'status', 'featured', 'sort_order', 'updated_at')
    list_editable = ('featured', 'sort_order')
    search_fields = ('title', 'persian_title')


@admin.register(SkillGroup)
class SkillGroupAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'sort_order', 'updated_at')
    list_editable = ('icon', 'sort_order')
    search_fields = ('title',)


@admin.register(TimelineItem)
class TimelineItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'sort_order', 'updated_at')
    list_editable = ('sort_order',)
    search_fields = ('title', 'description')
