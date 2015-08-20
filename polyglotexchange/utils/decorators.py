from functools import wraps
from django.utils.decorators import available_attrs
from django.conf import  settings

def redirect_to_user_passes_test(test_func, redirect_to=settings.DEFAULT_REDIRECT_TO):
    """
    Decorator for views that checks that the user passes the given test,
    redirecting to the url given page if necessary. The test should be a callable
    that takes the user object and returns True if the user passes.
    """

    def decorator(view_func):
        @wraps(view_func, assigned=available_attrs(view_func))
        def _wrapped_view(request, *args, **kwargs):
            if test_func(request.user):
                return view_func(request, *args, **kwargs)
            from django.http import HttpResponseRedirect
            return HttpResponseRedirect(redirect_to)
        return _wrapped_view
    return decorator