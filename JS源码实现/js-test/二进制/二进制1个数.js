// 计算前n个数字二进制形式中1的个数
// 最直接的算法是与1与，判断每位是0还是1，以下是其他思路
// O(nk)
function fn1(num) {
    let res = []
    for (let i = 0; i <= num; i++) {
        // 利用 i&(i-1)能把最右边的1变为0，因此只需循环运行i=i&(i-1)，直至i=0即二进制全部变为0，则所有的1变0执行完成
        let j = i
        res[i] = 0
        while (j) {
            // O(k) 一个整数有k位
            res[i]++
            j = j & (j - 1)
        }
    }

    return res
}

console.log(fn1(7))

// O(n)
function fn2(num) {
    let res = []
    for (let i = 1; i <= num; i++) {
        res[i] = 0
        // 因为 i&(i-1)能把最右边的1变为0，意味着整数i比整数i&(i-1)的1个数多1
        res[i] = res[i & (i - 1)] + 1
    }

    return res
}

console.log(fn2(6))

// O(n)
function fn3(num) {
    let res = []
    for (let i = 0; i <= num; i++) {
        //
        res[i] = 0
    }
    for (let i = 1; i <= num; i++) {
        // i为偶数时，与i >> 1 的1个数相等， i为奇数时，与（i >> 1）+ 1 的1个数相等，
        // i&1 偶数结果是0 奇数结果是1
        res[i] = res[i >> 1] + (i & 1)
    }

    return res
}
console.log(fn3(7))
