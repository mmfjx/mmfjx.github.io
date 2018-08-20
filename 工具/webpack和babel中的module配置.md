##ECMAScript 6 的模块相比 CommonJS 的require (...)有什么优点？


###1. TreeShaking

虽然这是 Webpack 2 中的新特性，但是它与 ES6 模块化有着千丝万缕的关系。

下面这段代码：

module.js

```
export const sayHello = name => `Hello ${name}!`;
export const sayBye = name => `Bye ${name}!`;  
index.js

import { sayHello } from './module';

sayHello('World');  
```

假设这个工程一共只有两个文件，那么sayBye() 方法虽然没有被使用过，但是仍然会被 export。然而如果我们在 Babel 中启用 ES6 模块化，同时升级到 Webpack 2.0/3.0 那么就可以轻松实现 TreeShaking（利用的是 Webpack 2+ 的 Native Import 特性），最终的效果是只有 sayHello() 会被作为 module 的一部分导出。

只需要用下面的代码就可以启用 Babel 的 ES6 模块化。

.babelrc

```
{
  presets: [ 
    [ 'es2015', { modules: false } ],
    ...
  ],
  plugins: [...]
}
```
请注意，modules 属性的值只能是 false，不支持 true，<mark>在过去我们没有设置 module 属性时，Babel 会将 import 转译成 CommonJS 的 require()，再有 Webpack 去处理 require() 的逻辑。而将 module 变为 false 后，Babel 会直接输出 import 语句，转由 Webpack 去实现所谓 native import 的逻辑，同理 export 语句也是由 Webpack 去实现转译的。