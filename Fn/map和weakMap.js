// ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
// 不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。
// Map属性：
// size属性返回 Map 结构的成员总数。
// Map.prototype.set(key, value)，set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
// Map.prototype.get(key)，get方法读取key对应的键值，如果找不到key，返回undefined。
// Map.prototype.has(key)，has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
// Map.prototype.delete(key)delete()方法删除某个键，返回true。如果删除失败，返回false。
// Map.prototype.clear()，clear()方法清除所有成员，没有返回值。
// Map 结构原生提供三个遍历器生成函数和一个遍历方法：
// Map.prototype.keys()：返回键名的遍历器。
// Map.prototype.values()：返回键值的遍历器。
// Map.prototype.entries()：返回所有成员的遍历器。
// Map.prototype.forEach()：遍历 Map 的所有成员。
// 需要特别注意的是，Map 的遍历顺序就是插入顺序。
const map0 = new Map([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
])
console.log(map0.has(1))
console.log(map0.delete(1))
console.log(map0.get(1))
map0.set(1, 'd')
console.log(map0.get(1))

//如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
let map = new Map()
map.set(-0, 123)
map.get(+0) // 123

map.set(true, 1)
map.set('true', 2)
map.get(true) // 1

map.set(undefined, 3)
map.set(null, 4)
map.get(undefined) // 3

map.set(NaN, 123)
map.get(NaN) // 123

// WeakMap只接受对象（null除外）和 Symbol 值作为键名，不接受其他类型的值作为键名。
const map1 = new WeakMap()
map1.set(1, 2) // 报错
map1.set(null, 2) // 报错
map1.set(Symbol(), 2) // 不报错

// WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
// 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。

const wm1 = new WeakMap()

const element = document.getElementById('example')

wm1.set(element, 'some information')
wm1.get(element) // "some information"
// 上面代码中，先新建一个 WeakMap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。

// 也就是说，上面的 DOM 节点对象除了 WeakMap 的弱引用外，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。WeakMap 保存的这个键值对，也会自动消失。

// 总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

// 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

const wm = new WeakMap()
let key = {}
let obj = { foo: 1 }

wm.set(key, obj)
obj = null
wm.get(key)
// Object {foo: 1}
// 上面代码中，键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。
// WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。

// WeakSet 和 WeakMap 是基于弱引用的数据结构，ES2021 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。
// WeakRef 实例对象有一个deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined。
let target = {}
let wr = new WeakRef(target)

let obj1 = wr.deref()
if (obj1) {
    // target 未被垃圾回收机制清除
    // ...
}

// ES2021 引入了清理器注册表功能 FinalizationRegistry，用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数。
// 注册表实例的register()方法，用来注册所要观察的目标对象。
// registry.register(theObject, "some value", theObject);
// // ...其他操作...
// registry.unregister(theObject); // 取消注册的回调函数
// makeWeakCached()用于建立一个缓存，缓存里面保存对原始文件的弱引用。
function createV(key) {
    return [key[0], key[0] + key[0]]
}
function makeWeakCached(f) {
    const cache = new Map()
    // 增加一个清理器注册表，一旦缓存的原始对象被垃圾回收机制清除，会自动执行一个回调函数。该回调函数会清除缓存里面已经失效的键。
    const cleanup = new FinalizationRegistry((key) => {
        const ref = cache.get(key)
        if (ref && !ref.deref()) {
            cache.delete(key)
        }
    })

    return (key) => {
        console.log([...cache])
        const ref = cache.get(key)
        if (ref) {
            const cachedV = ref.deref()
            if (cachedV !== undefined) return cachedV
        }
        const newV = f(key)
        cache.set(key, new WeakRef(newV))
        cleanup.register(newV, key)
        return newV
    }
}
const getCached = makeWeakCached(createV)
console.log(getCached(['a']))
console.log(getCached(['b']))
