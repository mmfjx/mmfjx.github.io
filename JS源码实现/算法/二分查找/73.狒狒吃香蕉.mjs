// 狒狒很喜欢吃香蕉，一天它发现了n堆香蕉，第i堆有pile[i]根香蕉。门卫刚好走开，H小时后才会回来。狒狒喜欢细嚼慢咽，但想在门卫回来之前吃完所有的香蕉。请问狒狒每小时至少吃多少根香蕉？如果狒狒决定每小时吃k根香蕉，而它在吃对的某一堆剩余的香蕉的数量少于k, 那么它只会将这一堆的香蕉吃完，下一个小时才会吃另一堆香蕉
// 假设狒狒每小时吃k根，k的范围为1到max，max为n堆香蕉中的最大值，对这个范围进行二分查找, 如果k吃完的时间大于H, 则取mid+ 1到max, 反之取1到mid-1, 但需注意k是不是在H小时内吃的最少的，如果不是，再往前找
const piles = [3, 6, 7, 11]
function fn(piles, h) {
    let left = 1;
    let right = Math.max(...piles)
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (getHour(mid, piles) <= h) {
            if (mid === 1 || getHour(mid - 1, piles) > h) {
                return mid
            }
            right = mid - 1
        } else {
            left = mid + 1
        }

    }
    return -1
}

function getHour(k, piles) {
    let hour = 0;
    for (let num of piles) {
        hour += Math.ceil(num / k)
    }
    return hour
}
console.log(fn(piles, 8))