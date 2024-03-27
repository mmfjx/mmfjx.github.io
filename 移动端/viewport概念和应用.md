# Viewport 概念和应用

只有明白移动设备上的 viewport 之后，才能更好的让页面适配或响应各种不同分辨率的移动设备

## 一、像素相关

### 1.1 基本概念

-   设备像素（device pixels）：物理像素，即移动显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果，与程序员无关，大小可通过 screen.width/height 获取

-   css 像素：逻辑像素，程序员真正关心的像素，是一个抽象像素，用来精确度量 Web 页面上的内容。一般情况之下，CSS 像素称为与设备无关的像素(device-independent pixel)，简称 DIPs， 也叫设备独立像素(density-independent pixel)，和密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说 CSS 像素)，然后由相关系统转换为物理像素。？？？？？？？

    -   屏幕密度：以每英寸有多少物理像素来计算（PPI），其计算公式如下：

    ![ppi](https://github.com/mmfjx/mmfjx.github.io/blob/master/img/ppi.png) （手机屏幕的尺寸，是屏幕对角线的英寸数）

    -   PPI 超过 326 则认为是视网膜屏，视网膜屏是指一块屏幕的像素密度达到一定程度的时候人在看屏幕的时候不会出现颗粒感，如果像素密度再大用户也感知不出来了，iphone4 及以上都是视网膜屏

    -   视网膜：http://www.w3cplus.com/css/towards-retina-web.html

*   手机分辨率：1080 \* 1920 表示横向有 1080 个物理像素，纵向有 1920 个物理像素

## 1.2 像素们之间的关系

标准情况下，一个 css 像素对应一个设备像素，比如手机分辨率为 750 *1334，那么要覆盖全屏也只需要 css 像素 750 *1334，但是对于视网膜屏，一个 css 像素对应多个设备像素，他们之间的比例关系可通过设备像素比(device pixel ratio)知道，简称为 dpr， 可由 window.devicePixelRatio 获取

> window 对象有一个 devicePixelRatio 属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。css 中的 px 就可以看做是设备的独立像素，所以通过 devicePixelRatio，我们可以知道该设备上一个 css 像素代表多少个物理像素。例如，在 Retina 屏的 iphone 上，devicePixelRatio 的值为 2，也就是说 1 个 css 像素相当于 2 个物理像素。但是要注意的是，devicePixelRatio 在不同的浏览器中还存在些许的兼容性问题，所以我们现在还并不能完全信赖这个东西，具体的情况可以看下这篇文章。

参考文章：
http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html

http://www.cnblogs.com/2050/p/3877280.html

https://www.quirksmode.org/mobile/viewports.html

## 二、viewport 定义

viewport 直观感觉是用户可以看到页面内容的视觉区域，功能在于控制你网站的最高块状（block）容器：<html>元素。

### 2.1 PC 端的视口

只有一个，严格等于浏览器的窗口，viewport 就是浏览器窗口的宽度高度，尺寸可通过 2 对属性获取

window.innerWidth/Height 包含滚动条

document. documentElement. clientWidth/Height 不包含

### 2.2 移动端的视口

ppk 大神提出 3 个 viewport 概念，为什么会出现这么多呢？

大概总结一下就是如果在移动端显示 pc 端的网页，移动端为了能够全部展示，会对网页进行缩小，这样也就导致文字什么的都缩小，根本看不清什么东西。为了更好的解释移动端的布局，所以 ppk 大神提出了 3 个视口的概念。

> 首先，移动设备上的浏览器认为自己必须能让所有的网站都正常显示，即使是那些不是为移动设备设计的网站。但如果以浏览器的可视区域作为 viewport 的话，因为移动设备的屏幕都不是很宽，所以那些为桌面浏览器设计的网站放到移动设备上显示时，必然会因为移动设备的 viewport 太窄，而挤作一团，甚至布局什么的都会乱掉。也许有人会问，现在不是有很多手机分辨率都非常大吗，比如 768x1024，或者 1080x1920 这样，那这样的手机用来显示为桌面浏览器设计的网站是没问题的吧？前面我们已经说了，css 中的 1px 并不是代表屏幕上的 1px，你分辨率越大，css 中 1px 代表的物理像素就会越多，devicePixelRatio 的值也越大，这很好理解，因为你分辨率增大了，但屏幕尺寸并没有变大多少，必须让 css 中的 1px 代表更多的物理像素，才能让 1px 的东西在屏幕上的大小与那些低分辨率的设备差不多，不然就会因为太小而看不清。所以在 1080x1920 这样的设备上，在默认情况下，也许你只要把一个 div 的宽度设为 300 多 px（视 devicePixelRatio 的值而定），就是满屏的宽度了。回到正题上来，如果把移动设备上浏览器的可视区域设为 viewport 的话，某些网站就会因为 viewport 太窄而显示错乱，所以这些浏览器就决定默认情况下把 viewport 设为一个较宽的值，比如 980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。ppk 把这个浏览器默认的 viewport 叫做 layout viewport。这个 layout viewport 的宽度可以通过 document.documentElement.clientWidth 来获取。
> 然而，layout viewport 的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个 viewport 来代表 浏览器可视区域的大小，ppk 把这个 viewport 叫做 visual viewport。visual viewport 的宽度可以通过 window.innerWidth 来获取，但在 Android 2, Oprea mini 和 UC 8 中无法正确获取。

参考文章：http://www.cnblogs.com/2050/p/3877280.html

1. visual viewport： 手机移动端浏览器的可视区域大小，可通过 window.innerWidth /Height 获取，也就是直觉上的视口（均指 css 像素）
   ![](https://github.com/mmfjx/mmfjx.github.io/blob/master/img/visual viewport.png)
2. layout viewport ：隐藏在背后的一个 viewport，比浏览器的可视区域大，通过 document.documentElement.clientWidth 来获取。移动设备上的浏览器都有自己的默认值（均指 css 像素）
   ![](https://github.com/mmfjx/mmfjx.github.io/blob/master/img/layout viewport.png)
3. ideal viewport：移动设备的理想 viewport，无缩放，无滚动条的完美页面大小（均指 css 像素）
   现在我们已经有两个 viewport 了：layout viewport 和 visual viewport。但浏览器觉得还不够，因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的 viewport。所谓的完美适配指的是，首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二，显示的文字的大小是合适，比如一段 14px 大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段 14px 的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理。ppk 把这个 viewport 叫做 ideal viewport，也就是第三个 viewport——移动设备的理想 viewport。
   ideal viewport 并没有一个固定的尺寸，不同的设备拥有有不同的 ideal viewport。所有的 iphone 的 ideal viewport 宽度都是 320px，无论它的屏幕宽度是 320 还是 640，也就是说，在 iphone 中，css 中的 320px 就代表 iphone 屏幕的宽度。

但是安卓设备就比较复杂了，有 320px 的，有 360px 的，有 384px 的等等，关于不同的设备 ideal viewport 的宽度都为多少，可以到http://viewportsizes.com去查看一下，里面收集了众多设备的理想宽度。
![](https://github.com/mmfjx/mmfjx.github.io/blob/master/img/visual viewport.png)

    再总结一下：ppk把移动设备上的viewport分为layout viewport  、 visual viewport   和 ideal viewport  三类，其中的ideal viewport是最适合移动设备的viewport，ideal viewport的宽度等于移动设备的屏幕宽度，只要在css中把某一元素的宽度设为ideal viewport的宽度(单位用px)，那么这个元素的宽度就是设备屏幕的宽度了，也就是宽度为100%的效果。ideal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对ideal viewport 而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。

## 三、meta 标签对 viewport 的作用

```html
<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
/>
```

移动设备默认的是 layout viewport，而开发需要的 ideal viewport， 通过上面的 meta 标签可将 layout viewport 的宽度设置为 ideal viewport 的宽度，即设备的宽度。

这个 name 为 viewport 的 meta 标签到底有哪些东西呢，又都有什么作用呢？

meta viewport 标签首先是由苹果公司在其 safari 浏览器中引入的，目的就是解决移动设备的 viewport 问题。后来安卓以及各大浏览器厂商也都纷纷效仿，引入对 meta viewport 的支持，事实也证明这个东西还是非常有用的。

在苹果的规范中，meta viewport 有 6 个属性(暂且把 content 中的那些东西称为一个个属性和值)，如下：

1. width: 设置 layout viewport 的宽度，为一个正整数，或字符串"device-width"

2. initial-scale:

设置页面的初始缩放值，为一个数字，可以带小数 （scale = 物理像素/逻辑像素 ，因为物理像素是不变的为 1，所以 scale 变小，则逻辑像素变大，也就是一个物理像素对应的逻辑像素变多，反过来就是相同物理像素大小情况下，展示逻辑像素更少，即对应逻辑像素表示的 viewport 的大小会变小，visual viewport 和 layout、ideal viewport 都会变小，同时字体的实际像素大小也会跟着变大，但对人眼来说变化不大？？？？）

3. minimum-scale

允许用户的最小缩放值，为一个数字，可以带小数

4. maximum-scale

允许用户的最大缩放值，为一个数字，可以带小数

5. height

设置 layout viewport 的高度，这个属性对我们并不重要，很少使用

6. user-scalable

是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许

这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。

此外，在安卓中还支持 target-densitydpi 这个私有属性，它表示目标设备的密度等级，作用是决定 css 中的 1px 代表多少物理像素

target-densitydpi：值可以为一个数值或 high-dpi 、 medium-dpi、 low-dpi、 device-dpi 这几个字符串中的一个

特别说明的是，当 target-densitydpi=device-dpi 时， css 中的 1px 会等于物理像素中的 1px。

因为这个属性只有安卓支持，并且安卓已经决定要废弃 target-densitydpi 这个属性了，所以这个属性我们要避免进行使用 。

meta 中设置 viewport 总结：

若没有设置 meta 的 viewport，移动设备默认的是宽度是 layout viewport

每个移动设备浏览器都有一个理想的宽度，其宽度等于设备的 100%css 像素，与物理像素无关

除了设置 meta 的 width 为 device-width，initial-scale=1 也有把 viewport 的宽度设为理想宽度的作用，但彼此都有一些毛病，不是全机型适用，所以可以一起用

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```
