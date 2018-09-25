
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_jwt.views import obtain_jwt_token
from accounts.views import (
    UserViewSet,
    ActivateView, 
    UserLoginAPIView, 
    ForgotPassword,
    GenerateCupon,
    CuponCodeViewSet
)
from posts.views import (
    PostViewSet,
    CategoryViewSet,
    CommentViewSet,
    ReadPost,
    CommentPost
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'cupon-code', CuponCodeViewSet, base_name='cupon-code')
router.register(r'posts', PostViewSet, base_name='posts')
router.register(r'category', CategoryViewSet, base_name='category')
router.register(r'comments', CommentViewSet, base_name='comments')
from django.views.generic import TemplateView

urlpatterns = [
    path('api/', include(router.urls)),

    path('api/generate-cupon/', GenerateCupon.as_view() ),
    path('api/account/reset-password/', ForgotPassword.as_view() ),
    path('api/account/login/', UserLoginAPIView.as_view() ),
    path('api/account/read/', ReadPost.as_view() ),
    path('admin/', admin.site.urls),
    path('api/account/comment/', CommentPost.as_view() ),
    path('api-token-auth/', obtain_jwt_token),
]

from django.conf import settings
from django.conf.urls.static import static
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += re_path('.*', TemplateView.as_view(template_name='index.html')),
    