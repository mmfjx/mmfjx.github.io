let obj = { num1: 111 }

obj.child = obj = { num2: 222 }

// obj.child = obj = { num2: 222 }，相等于obj.child = (obj = { num2: 222 })。
// 现在obj指向的堆内存上开辟了一个child属性，等待赋值；然后在赋值的时候，obj变得不再指向这块堆内存了，但是这块堆内存上的child属性指向的是被赋值之后的结果，即{ num2: 222 }。因为新的obj上没有child，所以就是undefined了。
console.log(obj.child)
console.log(obj)
