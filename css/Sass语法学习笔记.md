## Sass语法学习笔记

Sass 是对 CSS 的扩展，让 CSS 语言更强大、优雅。 它允许你使用变量、嵌套规则、 mixins、导入等众多功能， 并且完全兼容 CSS 语法。 Sass 有助于保持大型样式表结构良好， 同时也让你能够快速开始小型项目， 特别是在搭配 Compass 样式库一同使用时。

### 基本用法

#### 1. 变量
SASS允许使用变量，所有变量以$开头。

```
$blue : #1875e7;　
div {
　　　color : $blue;
}
```
如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中

```　
$side : left;
.rounded {
　　border-#{$side}-radius: 5px;
}
```

#### 2.计算功能

SASS允许在代码中使用算式：

```
body {
　　margin: (14px/2);
　  top: 50px + 100px;
　　right: $var * 10%;
}
```
#### 3.嵌套功能

SASS允许选择器嵌套

```
div h1 {
　　　　color : red;
　　}
```
可以写为如下格式：

```
div {
　　　　hi {
　　　　　　color:red;
　　　　}
　　}
```
属性嵌套, 属性后必须加上：号

```
　　p {
　　　　border: {
　　　　　　color: red;
　　　　}
　　}
```
嵌套引入父元素，如伪类a:hover,可通过<mark>&</mark>引用父元素

```
　a {
　　　　&:hover { color: #ffb3ff; }
　　}
```
#### 4.注释
 - 标准注释 ``` /* comment */ ```，会保留到编译后的文件。
 - 单行注释 ``` // comment ```，只保留在SASS源文件中，编译后被省略.
 - 重要注释 ``` /*! 重要注释 */ ``` ，即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。
   
### 代码重用

#### 1.继承
SASS允许一个选择器，继承另一个选择器，如class1：

```
　　.class1 {
　　　　border: 1px solid #ddd;
　　}
　　
　　　.class2 {
　　　　@extend .class1;
　　　　font-size:120%;
　　}　　
```
#### 2.Mixin

Mixin有点像C语言的宏（macro），是可以重用的代码块。

<mark>使用@mixin命令，定义一个代码块。</mark>

```
　　@mixin left {
　　　　float: left;
　　　　margin-left: 10px;
　　}
```
使用@include命令，调用这个mixin

```
div {
　　　　@include left;
　　}
```
mixin的强大之处，在于可以指定参数和缺省值。

```
　@mixin left($value: 10px) {
　　　　float: left;
　　　　margin-right: $value;
　　}
```
使用时，根据需要加入参数

```
　div {
　　　　@include left(20px);
　　}
```
下面是一个mixin的实例，用来生成浏览器前缀。

```
　@mixin rounded($vert, $horz, $radius: 10px) {
　　　　border-#{$vert}-#{$horz}-radius: $radius;
　　　　-moz-border-radius-#{$vert}#{$horz}: $radius;
　　　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;
　　}
```
使用时，可如下调用

```
#navbar li { @include rounded(top, left); }
#footer { @include rounded(top, left, 5px); }
　　
```
  
#### 3.颜色函数
#### 4. 插入文件
@import命令，用来插入外部文件。

```
@import "path/filename.scss";
```
如果插入的是.css文件，则等同于css的import命令。

```
@import "foo.css";
```
###高级用法

####1.条件语句
@if和@else语句

```
　　@if lightness($color) > 30% {
　　　　background-color: #000;
　　} @else {
　　　　background-color: #fff;
　　}
```
#### 2.循环语句
@for、@while和@each循环语句

```
  // @for
　@for $i from 1 to 10 {
　　　　.border-#{$i} {
　　　　　　border: #{$i}px solid blue;
　　　　}
　　}
　　
　　// @while
　　$i: 6;
　　@while $i > 0 {
　　　　.item-#{$i} { width: 2em * $i; }
　　　　$i: $i - 2;
　　}
　　
　　// @each
　　@each $member in a, b, c, d {
　　　　.#{$member} {
　　　　　　background-image: url("/image/#{$member}.jpg");
　　　　}
　　}
```
####3.自定义函数
```
　@function double($n) {
　　　　@return $n * 2;
　　}
　　#sidebar {
　　　　width: double(5px);
　　}
```
