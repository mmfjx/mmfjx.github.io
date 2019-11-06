import Queue from './queue.js'

let oneQueue = new Queue();




let inputDom = document.getElementById('inputValue');
let pushBtn = document.getElementById('push');
let popBtn = document.getElementById('pop');

let contentDom = document.getElementById('content');
pushBtn.addEventListener('click', (event) => {
    let inputValue = inputDom.value;
    oneQueue.enqueue(inputValue)
    contentDom.innerHTML = `当前队列：${oneQueue.print()}`;
    console.log(oneQueue.size)
    inputDom.value = '';
})

popBtn.addEventListener('click', (event) => {
    oneQueue.dequeue(inputValue)
    contentDom.innerHTML = `当前队列：${oneQueue.print()}`;
    console.log(oneQueue.size)

})