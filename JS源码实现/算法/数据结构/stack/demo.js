import Stack from './stack.js'

let oneStack = new Stack();
// oneStack.push(1);
// oneStack.push(2);
// oneStack.pop();
console.log(oneStack.size)
console.log(oneStack)

let inputDom = document.getElementById('inputValue');
let pushBtn = document.getElementById('push');
let popBtn = document.getElementById('pop');

let contentDom = document.getElementById('content');
pushBtn.addEventListener('click', (event) => {
    let inputValue = inputDom.value;
    oneStack.push(inputValue)
    contentDom.innerHTML = `当前队列：${oneStack.print()}`;
    console.log(oneStack.size)
    inputDom.value = '';
})

popBtn.addEventListener('click', (event) => {
    oneStack.pop(inputValue)
    contentDom.innerHTML = `当前队列：${oneStack.print()}`;
    console.log(oneStack.size)

})