// 编写一个函数计算多个数组的交集

var intersection = function(arrs) {
    return arrs.reduce((sum, arr) => {
        return [...new Set(arr.filter(item => sum.includes(item)))]
    })
}


