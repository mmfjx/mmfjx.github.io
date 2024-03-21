// 把二叉树序列化为字符串，并能将该字符串反序列化除原来的二叉树的算法
//思路：采用前序遍历是最方便的，第一个数字一定根节点，同时需要分隔符，分隔开节点。 要能反序列化回到原来的二叉树，需要注意子节点为空的情况，用‘#’代替空节点
import Node from '../数据结构/Node.mjs'
function serialize(root) {
    if (!root) {
        return '#'
    }

    let leftStr = serialize(root.left)
    let rightStr = serialize(root.right)
    return `${root.key},${leftStr},${rightStr}`
}

function deserialize(str) {
    const arr = str.split(',')
    let i = 0
    return dfs(arr, i).node
}

function dfs(arr, i) {
    const str = arr[i]
    i++
    if (str === '#') {
        return { node: null, i }
    }
    const node = new Node(str)

    const left = dfs(arr, i)
    node.left = left.node
    i = left.i
    const right = dfs(arr, i)
    node.right = right.node
    i = right.i
    return { node, i }
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
        right: { key: 9, left: null, right: null },
    },
}

const str = serialize(root)
console.log(str)

console.log(deserialize(str))
