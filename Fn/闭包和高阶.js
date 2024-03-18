// 当函数作为返回值，或者作为参数传递时，该函数就被称为闭包。

// 闭包是能够读取其他函数内部变量的函数，可以使用函数之外定义的变量。

var basePrice = 10.0 //起步价
var baseMiles = 3.0 //起步里程
function taxiPrice(unitPrice, Mileage) {
    function totalPrice() {
        //计算总费用 ；函数内部定义的函数(闭包),可以访问外部函数的参数
        if (Mileage > baseMiles) {
            //超过起步里程
            return unitPrice * Mileage //单价与里程相乘
        } else {
            //在起步里程内
            return basePrice
        }
    }
    return totalPrice() //将函数作为返回值返回
}
taxiPrice(2.0, 6.0) //打车费用12.00

// 高阶函数
// 以一个或多个函数作为参数的函数。
function diffAge(m, n, abs) {
    //m、n是普通参数,abs是函数参数.因此diffAge就是高阶函数
    return abs(m - n)
}
diffAge(19, 22, Math.abs) //把Math对象的abs函数传递给abs
