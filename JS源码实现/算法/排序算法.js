// https://www.cnblogs.com/AlbertP/p/10847627.html
// 冒泡排序
function bubbleSort(arr) {
    const len = arr.length;
    for(let i = 0; i < len; i++) { // 已排个数
        for(let j = 0; j < len - 1 - i; j++) { // 需冒泡个数
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

// 选择排序
function selectSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;
        for(let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        let temp = arr[min] ;
        arr[min] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let pre = i - 1;
        let cur = arr[i];
        while(pre >= 0 && arr[pre] > cur) {
            arr[pre + 1] = arr[pre];
            pre--
        }
        arr[pre+1]= cur
    }
    return arr;
}



function reOrderArray(array)
{
    debugger
    let evenStart = 0;
    let findFirstEven = false;
    for(let i = 0; i < array.length; i++) {
        if (!findFirstEven && array[i] % 2 === 0) {
            evenStart = i;
            findFirstEven = true;
        } else if(array[i] % 2 !== 0) {
           swap(array, evenStart, i);
           evenStart +=1;
        }
    }
    return array;

}

function swap(array, start, end) {
     let cur = array[end];
    for(let i = end; i > start; i--) {
        array[i] = array[i-1];
    }
    array[start] = cur;
}


console.log(bubbleSort([4,1,3,7,2]))

console.log(selectSort([4,1,3,7,2]))
console.log(insertSort([4,1,3,7,2]))

console.log(reOrderArray([2,4,6,1,3,5,7]))
