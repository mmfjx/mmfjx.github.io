// 输入一个数组，它的每个数字是某天的温度，请计算每天需要等几天才会出现更高的温度
const arr = [35, 31, 33, 36, 34] // 输出[3,1,1,0,0]
const Stack = require('./stack')
// 思路：栈的使用，对于不需要及时处理的数据，都可以用栈缓存后再处理, 这里把对应的下标入栈，方便找到对应的值做比较

function fn1(arr) {
    const stack = new Stack()
    // const res = Array(arr.length).fill(0)
    const res = Array.from({ length: arr.length }, () => 0)
    for (let i = 0; i < arr.length; i++) {
        if (stack.isEmpty) {
            stack.push(i)
        } else {
            while (arr[i] >= arr[stack.peer]) {
                res[stack.peer] = i - stack.peer
                stack.pop()
            }
            stack.push(i)
        }
    }
    return res
}
console.log(fn1(arr))
