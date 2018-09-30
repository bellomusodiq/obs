
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_jwt.views import obtain_jwt_token
from accounts.views import (
    UserViewSet,
    ActivateView, 
    UserLoginAPIView, 
    ForgotPassword,
    GenerateCupon,
    CuponCodeViewSet,
    UserCreate
)
from posts.views import (
    PostViewSet,
    CategoryViewSet,
    CommentViewSet,
    ReadPost,
    CommentPost,
    LocationViewSet
)

from witdrawals.views import WitdrawalViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'cupon-code', CuponCodeViewSet, base_name='cupon-code')
router.register(r'posts', PostViewSet, base_name='posts')
router.register(r'category', CategoryViewSet, base_name='category')
router.register(r'comments', CommentViewSet, base_name='comments')
router.register(r'locations', LocationViewSet, base_name='locations')
router.register(r'witdraw', WitdrawalViewSet, base_name='witdraw')
from django.views.generic import TemplateView
from django.views.static import serve

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/', include(router.urls)),

    path('api/generate-cupon/', GenerateCupon.as_view() ),
    path('api/account/reset-password/', ForgotPassword.as_view() ),
    path('api/account/login/', UserLoginAPIView.as_view() ),
    path('api/account/read/', ReadPost.as_view() ),
    path('api/account/create/', UserCreate.as_view() ),
    path('admin/', admin.site.urls),
    path('api/account/comment/', CommentPost.as_view() ),
    path('api-token-auth/', obtain_jwt_token),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
    