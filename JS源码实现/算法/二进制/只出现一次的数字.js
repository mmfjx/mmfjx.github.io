// 求数组中只出现一次的数字, 其他数字都出现了3次[0,1，0,1,0,1,300], 整数都是32位
// 思路：如果数字相同，则二进制相同，3个相同数字的二进制中对应位的1叠加起来肯定是3的倍速，那么每位叠加后的总数除以3的余1就是只出现一次的数字，最后只需把余1的位打印出来，组成后就是只出现一次的数字
function fn1(arr) {
    let bitSums = []
    for (let num of arr) {
        for (let i = 0; i < 32; i++) {
            bitSums[i] = 0
            bitSums[i] += (num >> (31 - i)) & 1
        }
    }
    let res = 0
    for (let i = 0; i < 32; i++) {
        res = (res << 1) + (bitSums[i] % 3)
    }
    return res
}
console.log(fn1([0, 100, 0, 100, 0, 100, 300]))

// 延展假设数组中只有一个数字出现n次，其他数字都出现m次， 找出只出现n次的数字

function fnN(arr, m, n) {
    let bitSums = []
    for (let num of arr) {
        for (let i = 0; i < 32; i++) {
            bitSums[i] = 0
            bitSums[i] += (num >> (31 - i)) & 1
        }
    }

    let res = 0
    for (let i = 0; i < 32; i++) {
        res = (res << 1) + (bitSums[i] % m ? 1 : 0)
    }
    return res
}
console.log(fnN([0, 100, 0, 100, 0, 100, 20, 20], 3, 2))
