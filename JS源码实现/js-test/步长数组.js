function range(start, end, step) {
    // Generate a sequence of numbers
    // Since the array is initialized with `undefined` on each position,
    // the value of `v` below will be `undefined`
    return Array.from({ length: (end - start) / step + 1}, (v, i) => start + i * step)
}

let ep = range(2, 8, 2);
console.log(ep)


// Generate the alphabet using Array.from making use of it being ordered as a sequence
let charRange = range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x));
console.log(charRange)

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
const flat1 = arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(flat1, 'flat');

// flat() 方法会移除数组中的空项:

function flatDeep(arr, deep) {
    return deep > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, deep - 1) : val), []) : arr.slice();
}
const flat2 = flatDeep(arr4, Infinity);
console.log(flat2, 'flat');


let ratings = [5, 4, 5];

let sum = 0;

let sumFunction = async function (a, b) {
    return a + b;
}

ratings.forEach(async function(rating) {
    sum = await sumFunction(sum, rating);
    console.log(sum, 'sum')
})

console.log(sum); // 0
