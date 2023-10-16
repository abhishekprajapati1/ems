def set_cookie(response, name, value, max_age=24*60*60):
    response.set_cookie(key=name, value=value, max_age=max_age, secure=True, httponly=True)

def sendtoken(req, res):
    access_token = req.COOKIES['access_token']
    refresh_token = req.COOKIES['refresh_token']
    set_cookie(res, 'access_token', access_token)
    set_cookie(res, 'refresh_token', refresh_token)
    res.data['access_token'] = access_token