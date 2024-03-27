# meta 标签定义

参考文章：

https://segmentfault.com/a/1190000002532413

http://blog.jayself.com/2014/03/22/meta/

https://blog.csdn.net/m0_38073829/article/details/75453050

```html
<!-- 定义字符集 -->
<meta charset="UTF-8" />

<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<!-- 说明：禁止浏览器从本地机的缓存中调阅页面内容。
注意：网页不保存在缓存中，每次访问都刷新页面。这样设定，访问者将无法脱机浏览。 -->
<meta http-equiv="pragma" content="no-cache" />

<!-- Cache-Control指定请求和响应遵循的缓存机制。no-cache指示请求或响应消息不能缓存 -->
<meta http-equiv="cache-control" content="no-cache" />

<!-- 在iOS中有两个meta值，apple-mobile-web-app-capable 和 apple-mobile-web-app-status-bar-style
，这两个会让网页内容以应用程序风格显示，并使状态栏透明。
两个都设置则网站开启对web app程序的支持，外界通称该应用为“离线APP”; -->
<!-- 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" />
<!-- 设置苹果工具栏颜色 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<meta name="apple-touch-fullscreen" content="yes" />
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes" />

<!-- 用于设定是否将网页内容中的手机号码显示为拨号的超链接，iPhone上默认为yes；
忽略页面中的数字识别为电话，忽略email识别 -->
<meta name="format-detection" content="telphone=no, email=no" />
<meta name="format-detection" content="address=no" />
```
