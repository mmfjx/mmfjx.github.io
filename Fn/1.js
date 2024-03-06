const list = [1, 2, 3]
const square = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num)
        }, 3000)
    })
}

function test() {
    list.forEach(async (x) => {
        const res = await square(x)
        console.log(res)
    })
}
test() // 3s后，同时输出1，4，9

// 原因是：forEach是以回调的方式执行square，每个回调都是单独square，相当于同步执行多个函数，并不是在一个async里面

// 最简单的迭代器对象
var zeroesForeverIterator = {
    [Symbol.iterator]: function () {
        return this
    },
    next: function () {
        return { done: false, value: 0 }
    },
}

// 可以用for-of方式遍历，要求被遍历的对象需要实现迭代器方法
// async function test() {
//   for(let x of list){
//     const res = await square(x);
//     console.log(res);
//   }
// }
