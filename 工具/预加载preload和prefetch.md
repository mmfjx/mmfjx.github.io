## 预加载preload和prefetch

* preload: 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源
* prefetch: 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源


在 preload 的请求中，缺少了一个 origin 的请求头字段，表示这个请求是匿名的请求。
让这两个请求能共用缓存的话，目前的解法是给 preload 加上 crossorigin 属性，这样请求头会带上 origin, 且与样式引入的请求同源，从而做到命中缓存：
```html
<link rel="preload" as="font" crossorigin href="https://at.alicdn.com/t/font_zck90zmlh7hf47vi.woff">

```

作者：蚂蚁金服数据体验技术
链接：[https://juejin.im/post/5a7fb09bf265da4e8e785c38]
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。