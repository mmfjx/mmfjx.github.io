import BinaryTree from './BinaryTree.js'

let binaryTree = new BinaryTree();

let inputDom = document.getElementById('inputValue');
// let indexDom = document.getElementById('index');
let pushBtn = document.getElementById('push');
let popBtn = document.getElementById('pop');
// let findBtn = document.getElementById('find');



let contentDom = document.getElementById('content');
// let positionDom = document.getElementById('position');
pushBtn.addEventListener('click', (event) => {
    let inputValue = inputDom.value;
    // let indexValue = indexDom.value;
    if (inputValue){
        binaryTree.insert(inputValue);
    }


    inputDom.value = '';
})

popBtn.addEventListener('click', (event) => {
    // let inputValue = inputDom.value;
    // oneLink.remove(inputValue)
    contentDom.innerHTML = `
    <p>中序遍历：${binaryTree.inOrderTraverse()}</p>
    <p>中序遍历11：${binaryTree.inOrderTraverseDef()}</p>

    <p>前序遍历：${binaryTree.preOrderTraverse()}</p>
    <p>后序遍历：${binaryTree.lastOrderTraverse()}</p>`;
    console.log(binaryTree.inOrderTraverse())

})

// findBtn.addEventListener('click', (e) => {
//     let inputValue = inputDom.value;
//     if (inputValue) {
//         let position = oneLink.findIndex(inputValue);
//         positionDom.innerHTML = `当前索引： ${position}`;
//     }
// })
