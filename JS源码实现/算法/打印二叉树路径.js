/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function FindPath(root, expectNumber)
{
    // write code here
    if ( !root ) return []

    const res = [];
    findChildPath(root, expectNumber, [root.val], res);
    return res;
}

function findChildPath(root, expectNumber, path, res){
    if (!root.left && !root.right && sum(path) === expectNumber ){
        res.push(path);
    }
    if (root.left) {
        findChildPath(root.left,expectNumber, path.concat(root.left.val), res );
    }
    if (root.right) {
        findChildPath(root.right,expectNumber, path.concat(root.right.val), res );
    }
}

function sum(arr) {
    return arr.reduce((sum,item) => {
        return sum += item;
    })
}