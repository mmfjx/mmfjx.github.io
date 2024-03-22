//  给定一个棵二叉树和一个值sum， 求二叉树中节点值之和为sum的路径的数量。路径的定义为二叉树顺着指向子节点的指针向下移动所经过的节点，但不一定从根节点开始，也不一定到叶节点结束

// 哈希表的键是累加的节点值之和，值是每个节点值之和出现的次数
// 调试才能更快的理解
function pathSum(root, sum) {
    const map = new Map()
    map.set(0, 1) // 初始化和为0 的次数为1
    return dfs(root, sum, map, 0)
}

function dfs(root, sum, map, path) {
    if (!root) {
        return 0
    }
    path += root.key
    let count = map.get(path - sum) || 0 // 因为是一个节点一个节点的累加，且每次累加和相减，都会是该路径某一层的累加节点和
    map.set(path, (map.get(path) || 0) + 1) // 开始进入下一层时，当前累加节点值之和出现的次数+1，表示该路径下已经出现的和
    count += dfs(root.left, sum, map, path)
    count += dfs(root.right, sum, map, path)
    map.set(path, map.get(path) - 1) //因为该路径已经结束，需返回上一层，开始另一路径的遍历，所以需要-1
    return count
}
const root = {
    key: 3,
    left: {
        key: 4,
        left: { key: 5, left: null, right: null },
        right: { key: 1, left: null, right: null },
    },
    right: {
        key: 2,
        left: null,
        right: { key: 6, left: null, right: null },
    },
}

console.log(pathSum(root, 8))
