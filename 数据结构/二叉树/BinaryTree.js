class Node {
    constructor(val) {
        this.key = val;
        this.left = null;
        this.right = null;
    }
}
export default class BinaryTree {
    constructor() {
        this.root = null;
    }

    // 添加节点
    insert(key){
        let newNode = new Node(key);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode){
        if (node.key >= newNode.key) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        }  else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // 中序遍历 -- 左-中-右
    inOrderTraverse() {
        const res = [];
        if (!this.root) return res;
        this.inOrderTraverseNode(this.root, res);
        return res;
    }

    inOrderTraverseNode(node, res) {
        if (!node) return
        this.inOrderTraverseNode(node.left, res);
        res.push(node.key);
        this.inOrderTraverseNode(node.right, res);
    }

    inOrderTraverseDef() {
        if (!this.root) return [];
        const res = [];
        const stack = [];
        stack.push(this.root);
        while(stack.length){
            let node = stack.pop();
            if (node.right) {
                stack.push(node.right)
            }
            if (node.left) {
                stack.push(node.left)
            }
            res.push(node.key);
        }
        return res;
    }


    // 前序遍历  中-左-右
    preOrderTraverse() {
        const res = [];
        if (!this.root) return res;
        this.preOrderTraverseNode(this.root, res);
        return res;
    }

    preOrderTraverseNode(node, res) {
        if (!node) return
        res.push(node.key)
        this.preOrderTraverseNode(node.left, res);
        this.preOrderTraverseNode(node.right, res);
    }

     // 后序遍历  左-右-中
     lastOrderTraverse() {
        const res = [];
        if (!this.root) return res;
        this.lastOrderTraverseNode(this.root, res);
        return res;
    }

    lastOrderTraverseNode(node, res) {
        if (!node) return

        this.lastOrderTraverseNode(node.left, res);
        this.lastOrderTraverseNode(node.right, res);
        res.push(node.key)
    }

}


// 重建二叉树
function reConstructBinaryTree(pre, mid) {
    if (!pre.length || !mid.length) {
        return null;
    }

    let root = new Node(pre[0]);

    let index = mid.indexOf(pre[0]);

    root.left = reConstructBinaryTree(pre.slice(1, index + 1), mid.slice(0, index));
    root.right = reConstructBinaryTree(pre.slice(index + 1), mid.slice(index + 1));
    return root;
}