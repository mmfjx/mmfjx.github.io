##弄清楚babel的stage

在使用babel的过程中，有一个 .babelrc 文件,里面可能会有这样一个配置

```
"presets": [
        "es2015",
        "stage-0",
        "react"
]
```
其中的 es2015 表示 babel会加载 es6 相关的编译模块，

####transform-runtime 对比 babel-polyfill
<https://juejin.im/post/59b9ffa8f265da06710d8e89>

babel-runtime 和 babel-plugin-transform-runtime 统称为 transform-runtime，因为一起用才比较好。

>  - babel-polyfill 是当前环境注入这些 es6+ 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。如果当前项目已经有一个 polyfill 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，那就直接引入吧。

> - transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。所以 transform-runtime 的方式更适合开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 polyfill 每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。

然后 stage-0 表示的是什么呢？

stage 系列集合了一些对 es7 的草案支持的插件，由于是草案，所以作为插件的形式提供。

如下是 stage 全员( 来自 babel 官网 ):

stage-0 - Strawman: just an idea, possible Babel plugin.
stage-1 - Proposal: this is worth working on.
stage-2 - Draft: initial spec.
stage-3 - Candidate: complete spec and initial browser implementations.
stage-4 - Finished: will be added to the next yearly release.
接下来，让我们逐个看下他们都有什么特殊的技巧


stage-2

同理，他拥有 3 的插件，还有

```
syntax-dynamic-import
transform-class-properties
```
<mark>syntax-dynamic-import 用于动态 import ，我们知道 import 语法只支持静态加载模块 (es6只支持静态文件，stage-2提案，建议引入import()函数，完成动态加载。)

import() 作为一个提案， 具体可以看这里 ，这个插件也只有被 babel内部使用，所以不再介绍, airbnb 提供了一个可用 插件 。

参考链接:<https://zhuanlan.zhihu.com/p/25961891>