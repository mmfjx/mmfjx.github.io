// 求一个正数m的平方根n， 给定精度 d， 4的平方根是2， 9的平方根是3
// 思路： n * n = m, 求m的平方根，即求n， n的范围是1 ~m，  可以利用二分法查找满足 (n * n - m )<=d 的值
//
function fn1(m, d) {
    let n = 1
    let left = 1
    let right = m

    while (left <= right) {
        n = (right + left) / 2
        if (n * n > m + d) {
            right = n
        } else if (n * n < m - d) {
            left = n
        } else {
            return n
        }
    }
}

console.log(fn1(12, 0.0005))
