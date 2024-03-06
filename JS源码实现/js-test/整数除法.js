// 题目：整数除法，比如 15/2，求商和余，不能使用乘除法
// 思路： 乘法是加法的叠加，除法是减法的叠加
function division(dividend, divisor) {
    // js 中最大安全整数 Number.MAX_SAFE_INTEGER 9007199254740991 = 2^53-1   最小安全整数Number.MIN_SAFE_INTEGER -9007199254740991  -2^53+1
    // 浮点数范围 （https://zhuanlan.zhihu.com/p/351127362）
    if (division === 0) {
        return Infinity;
    }
    let neg = 2
    if (dividend < 0) {
        neg--
        dividend = -dividend
    }
    if (divisor < 0) {
        neg--
        divisor = -divisor
    }
    const res = divisionCore(dividend, divisor)
    return {
        quotient:
            (res.quotient && (neg === 1 ? -res.quotient : res.quotient)) || 0, // 商
        remainder: res.remainder, // 余数
    }
}

/**
 * 整数除法的核心函数
 * @param {number} dividend 被除数
 * @param {number} divisor 除数
 * @returns {object} 包含商和余数的对象
 */
function divisionCore(dividend, divisor) {
    if (dividend < divisor) {
        return {
            quotient: 0, // 商为0
            remainder: dividend, // 余数为被除数
        }
    }
    let count = 0
    // 倍增 O(logN)次复杂度  N为 division
    while (dividend >= divisor) {
        let num = 1
        let value = divisor
        while (dividend > value + value) {
            num += num
            value += value
        }
        count += num // 累加商的值
        dividend -= value // 减去被除数的值
    }
    return {
        quotient: count, // 商
        remainder: dividend, // 余数
    }
}

console.log(division(-354,24))
