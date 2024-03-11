// 输入一个数组，找出数组中所有和为0的3个数字的三元数组，要求返回值中不得包含重复的三元组·
// 思路：先排序，再遍历固定其中一个数值i, 然后在剩下的数组中查找两个数字之和为-i的数值，因要求不重复，所以i遍历时，跳过重复的数值，查找两数之和为-i时，也跳过相同的数值
const arr = [-1, 0, 1, 2, -1, -4]
function fn1(arr) {
    // 先排序
    arr = arr.sort()
    console.log(arr)
    let i = 0
    let resArr = []
    while (i < arr.length - 2) {
        twoSum(i, resArr, arr)
        const temp = arr[i]
        while (arr[i] === temp && i < arr.length) {
            i++
        }
    }
    return resArr
}

// 双指针的方式查找
function twoSum(i, res, arr) {
    let s = i + 1
    let e = arr.length - 1
    const sum = -arr[i]
    while (s < e) {
        if (arr[s] + arr[e] < sum) {
            const temp = arr[s]
            // 保证两个数值不同，那第三个数值肯定不同
            while (arr[s] === temp && s < e) {
                s++
            }
        } else if (arr[s] + arr[e] > sum) {
            e--
        } else if (arr[s] + arr[e] === sum) {
            // 穷举所有的数值，不是只获取一个
            res.push([arr[i], arr[s], arr[e]])
            s++
            e = arr.length - 1
        }
    }
}

console.log(fn1(arr))
