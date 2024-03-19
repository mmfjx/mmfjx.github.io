// 后缀表达式是一种算术表达式，它的操作符在操作数的后面。输入一个用字符串数组表示的后缀表达式，请输出该后缀表达式的计算结果
const Stack = require('./stack.js')
const arr = ['2', '1', '3', '*', '+'] //结果是5
// 思路： 2+ 1 * 3， 数字先入栈，遇到符号，取最后入栈的两个数字计算，再把结果入栈，如此下去

function calc(n1, n2, operator) {
    switch (operator) {
        case '+':
            return n1 + n2
        case '_':
            return n2 - n1
        case '*':
            return n1 * n2
        case '/':
            return n2 / n1
        default:
            return 0
    }
}

function fn1(arr) {
    const stack = new Stack()
    for (let i = 0; i < arr.length; i++) {
        if (/\d/.test(arr[i])) {
            stack.push(parseInt(arr[i]))
        } else {
            const n1 = stack.pop()
            const n2 = stack.pop()
            stack.push(calc(n1, n2, arr[i]))
        }
    }
    return stack.pop()
}
console.log(fn1(arr))
