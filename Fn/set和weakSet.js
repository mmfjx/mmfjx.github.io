// Set 结构的实例有以下属性:
// Set.prototype.constructor：构造函数，默认就是Set函数。
// Set.prototype.size：返回Set实例的成员总数。

// Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）:
// Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
// Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// Set.prototype.clear()：清除所有成员，没有返回值。
// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach()：使用回调函数遍历每个成员

const a = new Set([1, 2, 3, 4, 4, 5])
const b = new Set(Array.from([4, 5, 6]))
// 交集
console.log('交集', new Set([...a].filter((ai) => b.has(ai))))
// 并集
console.log('并集', new Set([...a, ...b]))
// 差集（a 相对于 b 的）差集
console.log('差集', new Set([...a].filter((ai) => !b.has(ai))))
// 去重
let arr = [3, 5, 2, 2, 5, 5]
const unique = [...new Set(arr)]

a.delete(1)
a.add(0)
console.log(a.keys()) // key和values是一样的，值就是键
console.log(a.values())
console.log(a.entries())

// Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。

let set0 = new Set()
let a0 = NaN
let b0 = NaN
set0.add(a0)
set0.add(b0)
set0 // Set {NaN}
// 上面代码向 Set 实例添加了两次NaN，但是只会加入一个。这表明，在 Set 内部，两个NaN是相等的。

// Set遍历的顺序和添加的顺序是一致的
// Set是可迭代的，可使用for...of 遍历

let set = new Set([1, 4, 9])
set.forEach((value, key) => console.log(key + ' : ' + value))
console.log(set)

// 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
set = new Set([...set].map((value) => (value += value)))
console.log(set)
set = new Set(Array.from(set, (v) => (v += v)))
console.log(set)

// WeakSet 弱应用，键只能是对象或Symbol, 且是不可遍历和不适合引用的
// WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
//由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
const ws0 = new WeakSet()
const s = Symbol()
// ws.add(1) // 报错
ws0.add(s) // 不报错
// WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。
const w = [
    [1, 2],
    [3, 4],
]
const ws1 = new WeakSet(w) // WeakSet {[1, 2], [3, 4]}

// 成员已需是对象或Symbol
const d = [3, 4]
const ws2 = new WeakSet(b) // Uncaught TypeError: Invalid value used in weak set(…)

const ws = new WeakSet()
const obj = {}
const foo = {}

ws.add(window)
ws.add(obj)

ws.has(window) // true
ws.has(foo) // false

ws.delete(window) // true
ws.has(window) // false

// WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
const foos = new WeakSet()
class Foo {
    constructor() {
        foos.add(this)
    }
    method() {
        if (!foos.has(this)) {
            throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！')
        }
    }
}
// 上面代码保证了Foo的实例方法，只能在Foo的实例上调用。这里使用 WeakSet 的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。
