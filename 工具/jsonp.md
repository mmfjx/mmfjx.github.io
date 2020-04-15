## jsonp 跨域原理

步骤：
1. 前端预先定义一个函数，并把函数名作为script的src的一个参数（src就是跨域的请求接口），利用script会自动请求的特点，把函数名传给后端；
2. 后端拿到函数名之后，响应的内容，就是把这个函数的执行代码，并把真正需要给前端传递的数据作为这个函数的入参
3. 在前端，script获取到响应后，会自动执行代码，这样也就可以在函数内部获取到跨域后端的数据


前端代码
``` js
<script type="text/javascript">  
window.jsonpCallback = function(res) {    
    console.log(res);  
};
</script>
<script  src="http://localhost:8080/api/jsonp?msg=hello&cb=jsonpCallback"  type="text/javascript"></script>
```

后端代码

```js
const Koa = require("koa");
const fs = require("fs");
const app = new Koa();
app.use(async (ctx, next) => {  
    if (ctx.path === "/api/jsonp") {
        const { cb, msg } = ctx.query;
        ctx.body = `${cb}(${JSON.stringify({ msg })})`; 
        return;  
    }
});
app.listen(8080);

```