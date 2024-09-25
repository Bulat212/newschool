from django import template

register = template.Library()

@register.simple_tag(takes_context=True)
def active_class(context, url_name):
    request = context['request']
    if request.resolver_match.view_name == url_name:
        return 'tab-active'
    return ''