// 输入一个表示小行星的数组，数组中每个数字的绝对值表示小行星的大小，数字的正负号表示小行星运动的方向，正号表示向右飞行，负号表示向左飞行。如果两颗小行星相撞，那么体积较小的小行星将
// 会爆炸最终消失，体积较大的小行星不受影响。如果两颗小行星大小相等，那么它们都会爆炸消失，飞行方向相同的小行星永远不会相撞。求最终剩下的小行星。
// 例如 [4,5,-6,4,8,-5], 相撞之后最终剩下3颗小行星[-6,4,8]

// 思路：使用栈，当栈为空时，先入栈，如栈中有数据，依次与栈顶数据对比处理，直到所有都处理完
const Stack = require('./stack')
const arr = [4, 5, -6, 4, 8, -5]

function compare(stack, n) {
    if (n < 0) {
        let sn = stack.pop()
        while (sn > 0) {
            const diff = Math.abs(n) - Math.abs(sn)
            if (diff > 0) {
                sn = stack.pop()
            } else if (diff < 0) {
                stack.push(sn)
                return
            } else {
                // 相等，都消失
                return
            }
        }
        if (sn) {
            stack.push(sn)
        }
        stack.push(n)
    } else {
        stack.push(n)
    }
}

function fn1(arr) {
    const stack = new Stack()
    for (let i = 0; i < arr.length; i++) {
        if (stack.isEmpty) {
            stack.push(arr[i])
        } else {
            compare(stack, arr[i])
        }
    }
    return stack.items
}

console.log(fn1(arr))
