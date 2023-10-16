def should_authenticate(request):
    excluded_paths = ['/api/auth/login', '/api/auth/signup']
    return not any(request.path_info.startswith(path) for path in excluded_paths)