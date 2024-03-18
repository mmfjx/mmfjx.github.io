import Link from './link.js'

let oneLink = new Link();

let inputDom = document.getElementById('inputValue');
let indexDom = document.getElementById('index');
let pushBtn = document.getElementById('push');
let popBtn = document.getElementById('pop');
let findBtn = document.getElementById('find');



let contentDom = document.getElementById('content');
let positionDom = document.getElementById('position');
pushBtn.addEventListener('click', (event) => {
    let inputValue = inputDom.value;
    let indexValue = indexDom.value;
    if (indexValue && inputValue){
        oneLink.insert(inputValue, indexValue);
    } else {
        oneLink.append(inputValue);
    }
    contentDom.innerHTML = `当前链表：${oneLink.toString()}`;
    console.log(oneLink.size)
    inputDom.value = '';
})

popBtn.addEventListener('click', (event) => {
    let inputValue = inputDom.value;
    oneLink.remove(inputValue)
    contentDom.innerHTML = `当前链表：${oneLink.toString()}`;
    console.log(oneLink.size)

})

findBtn.addEventListener('click', (e) => {
    let inputValue = inputDom.value;
    if (inputValue) {
        let position = oneLink.findIndex(inputValue);
        positionDom.innerHTML = `当前索引： ${position}`;
    }
})
