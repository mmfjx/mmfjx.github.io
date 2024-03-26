# Dom 事件监听 passive 的作用

addEventListener(type, listener);
addEventListener(type, listener, options);
addEventListener(type, listener, useCapture);

-   type
    表示监听事件类型的大小写敏感的字符串。

-   listener
    当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。listener 必须是一个实现了 EventListener 接口的对象，或者是一个函数。有关回调本身的详细信息，请参阅事件监听回调

-   options 可选
    一个指定有关 listener 属性的可选参数对象。可用的选项如下：

    1. capture 可选
       一个布尔值，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。

    2. once 可选
       一个布尔值，表示 listener 在添加之后最多只调用一次。如果为 true，listener 会在其被调用之后自动移除。

    3. passive 可选
       一个布尔值，设置为 true 时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。查看使用 passive 改善滚屏性能以了解更多。

    ```javascript
    document.addEventListener("touchstart", function(e){
        ... // 浏览器不知道这里会不会有 e.preventDefault()
    })
    ```

    由于 touchstart 事件对象的 cancelable 属性为 true，也就是说它的默认行为可以被监听器通过 preventDefault() 方法阻止，那它的默认行为是什么呢，通常来说就是滚动当前页面（还可能是缩放页面），如果它的默认行为被阻止了，页面就必须静止不动。但浏览器无法预先知道一个监听器会不会调用 preventDefault()，它能做的只有等监听器执行完后再去执行默认行为，而监听器执行是要耗时的，有些甚至耗时很明显，这样就会导致页面卡顿。视频里也说了，即便监听器是个空函数，也会产生一定的卡顿，毕竟空函数的执行也会耗时。

    视频里还说了，有 80% 的滚动事件监听器是不会阻止默认行为的，也就是说大部分情况下，浏览器是白等了。所以，passive 监听器诞生了，<mark>passive 的意思是“顺从的”</mark>，表示它不会对事件的默认行为说 no，浏览器知道了一个监听器是 passive 的，它就可以在两个线程里同时执行监听器中的 JavaScript 代码和浏览器的默认行为了。

    Passive Event Listeners 是 Chrome 提出的一个新的浏览器特性：Web 开发者通过一个新的属性 passive 来告诉浏览器，当前页面内注册的事件监听器内部是否会调用 preventDefault 函数来阻止事件的默认行为，以便浏览器根据这个信息更好地做出决策来优化页面性能。当属性 passive 的值为 true 的时候，代表该监听器内部不会调用 preventDefault 函数来阻止默认滑动行为，Chrome 浏览器称这类型的监听器为被动（passive）监听器。目前 Chrome 主要利用该特性来优化页面的滑动性能，所以 Passive Event Listeners 特性当前仅支持 mousewheel/touch 相关事件
    passive 如果设置为 true，则绘制线程不用等待主线程了的事件回调函数执行完，它们可以并行执行，这样绘制线程也可立即响应，没有卡顿感，如果回调函数中有调用 event.preventDefault()，则不再起作用，执行到这句时，浏览器会给出警告。

> https://blog.csdn.net/dj0379/article/details/52883315

    4. signal 可选
       AbortSignal，该 AbortSignal 的 abort() 方法被调用时，监听器会被移除。

-   useCapture 可选
    一个布尔值，表示在 DOM 树中注册了 listener 的元素，是否要先于它下面的 EventTarget 调用该 listener。当 useCapture（设为 true）时，沿着 DOM 树向上冒泡的事件不会触发 listener。当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。进一步的解释可以查看 DOM Level 3 事件及 JavaScript 事件顺序文档。如果没有指定，useCapture 默认为 false。

参考： https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#passive
