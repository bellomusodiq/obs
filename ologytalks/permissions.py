from rest_framework.permissions import BasePermission

class IsOwnerOrAdminOrReadOnly(BasePermission):
    message = "you must be an admin or owner of this object"
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        try:
            if(request.user):
                return obj.user == request.user or request.user.is_admin
        except:
            pass

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        try:
            if(request.user):
                return obj.user == request.user or request.user.is_admin
        except:
            pass


class IsAdminOrReadOnly(BasePermission):
    message = "you must the admin"
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        try:
            return request.user.is_admin             
        except:
            return False

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        try:
            return request.user.is_admin             
        except:
            return False

class IsRegularUser(BasePermission):
    message = 'user must be logged in and not be admin user'
    def has_permission(self, request, view):
        try:
            return not request.user.is_admin
        except:
            return False