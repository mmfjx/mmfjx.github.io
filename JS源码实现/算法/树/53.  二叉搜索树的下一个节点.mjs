// 给定一棵二叉搜索树和它对的一个节点p, 请找出按中序遍历的顺序该节点p的下一个节点，假设节点对的值都是唯一的

//  按中序遍历，查找O(n), 但因为是二叉搜索树，所以可以判断当前节点和节点p的大小，小则在右子树查找，大则在左子树查找
function fn(root, p) {
    if (!root) {
        return root
    }
    let res = null;
    let node = root
    while (node) {
        if (node.key > p) {
            res = node  // 在左子树，当前节点有可能就是p的下一节点
            node = node.left
        } else { node = node.right }

    }
    return res
}


const root = {
    key: 4,
    left: {
        key: 2,
        left: { key: 1, left: null, right: null },
        right: { key: 3, left: null, right: null },
    },
    right: {
        key: 6,
        left: { key: 5, left: null, right: null },
        right: { key: 7, left: null, right: null },
    },
}

console.log(fn(root, 5))