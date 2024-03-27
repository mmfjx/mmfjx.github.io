# rem、vh、vw

rem 是作用于根元素 html 的字体大小，

http://yanhaijing.com/css/2017/09/29/principle-of-rem-layout/

http://yanhaijing.com/css/2017/09/29/principle-of-rem-layout/

flexible 主要功能是根据读取的 dpr， 设置 meta 的 init-scale 大小，然后再根据 viewport 宽度计算 1rem 的 px 值，1rem = 1/10 * width，最后设置 html 的字体大小 = 12*dpr ;

1rem = 1/7.5 \* width , 取 7.5 ，375 宽的情况下 font-size 为 50，方便后续 rem 的计算

vw、vh 视口单位区别于%单位，视口单位是依赖于视口的尺寸，根据视口尺寸的百分比来定义的；而%单位则是依赖于元素的祖先元素。

参考文章：

http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html

http://caibaojian.com/vw-vh.html

https://www.zhangxinxu.com/wordpress/2015/01/css-page-scrollbar-toggle-center-no-jumping/

https://www.zhangxinxu.com/wordpress/2012/09/new-viewport-relative-units-vw-vh-vm-vmin/
