from django.http import HttpResponse

def http_response(content, content_type="text/html", code=200, *args, **kwargs):
    http = HttpResponse(content=content, *args, **kwargs)
    http.status_code = code
    http.content_type = content_type
    return http