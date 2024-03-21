### 内置类型

#### 七种内置类型

* null
* undefined
* boolean
* string
* number
* object
* symbol

可以使用typeof 查看类型，但

```javascript
typeof null === object
typeof function a(){} === 'function'

```

* 最大的数： Number.MAX_VALUE, 64位
* 最大安全整数：2^53 -1，Number.MAX_SAFE_INTEGER
* 最小安全整数：-2^53 -1，Number.MIN_SAFE_INTEGER
* 不是数字的数字：NaN，可理解为无效数值、失败数值、坏数值，是为一个不等于自身的值，即NaN !== NaN
* void，内置标识符，值为undefined，void XXX，都是返回undefined
*
