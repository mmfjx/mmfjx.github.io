// 输入一个二维矩阵，如何计算给定左上角坐标和右下角坐标的子矩阵的数字之和？对于同一个二维矩阵，计算子矩阵的数字之和的函数可能由于输入不同的坐标而被反复调用多次，例如，输入
const arr = [
    [3, 0, 1, 4, 2],
    [5, 6, 3, 2, 1],
    [1, 2, 0, 1, 5],
    [4, 1, 0, 1, 7],
    [1, 0, 3, 0, 5],
] // 左上角坐标（2,1）和右下角坐标（4,3）的子矩阵，该函数输出8

// 时间复杂度o(mn)
// 这段代码的作用是计算给定左上角坐标和右下角坐标的子矩阵的数字之和。
// 整体来说，这段代码通过动态规划的方式，预先计算出矩阵中每个位置的数字之和，然后根据给定的左上角和右下角坐标，通过相减的方式计算出子矩阵的数字之和。这样可以提高计算效率，避免重复计算。
function fn1(arr, row1, col1, row2, col2) {
    // 代码首先判断输入的二维矩阵 arr 是否为空，如果为空则返回0。
    if (arr.length == 0) {
        return 0
    }
    // 然后，代码创建了一个二维数组 sums，用于存储从矩阵的左上角到当前位置的数字之和。sums 的行数和列数分别比原矩阵的行数和列数多1，这是为了方便计算子矩阵的数字之和。
    const sums = Array.from(new Array(arr.length + 1), () =>
        new Array(arr[0].length + 1).fill(0)
    )
    // 接下来，代码使用两个嵌套的循环遍历矩阵 arr 的每个元素。在内层循环中，代码累加当前行的数字之和，并将该和存储在 rowSum 变量中。然后，代码更新 sums 数组中的元素，使用动态规划的思想，通过 sums[i][j + 1] + rowSum 计算 sums[i + 1][j + 1]。
    for (let i = 0; i < arr.length; i++) {
        let rowSum = 0

        for (let j = 0; j < arr[0].length; j++) {
            rowSum += arr[i][j]
            sums[i + 1][j + 1] = sums[i][j + 1] + rowSum
        }
    }
    // 最后，代码返回子矩阵的数字之和，通过计算 sums[row2 + 1][col2 + 1] - sums[row1][col2 + 1] - sums[row2 + 1][col1] + sums[row1][col1] 得到。
    return (
        sums[row2 + 1][col2 + 1] -
        sums[row1][col2 + 1] -
        sums[row2 + 1][col1] +
        sums[row1][col1]
    )
}

console.log(fn1(arr, 2, 1, 4, 3))
