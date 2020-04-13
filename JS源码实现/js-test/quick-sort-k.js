

// 输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    if (arr.length <= k) return arr;
    if(k<=0) return 0;

    quickSelect(arr, 0, arr.length - 1, k - 1);
    console.log(arr);
    return arr.slice(0 ,k);

};

function quickSelect(arr, start, end, k) {
    debugger;
    if (start == end) return ;
    let pivot = arr[start];
    let  i = start, j = end;
    //遍历整个数组
    while (i <= j) {
        while (i <= j && arr[i] < pivot) i++;
        while (i <= j && arr[j] > pivot) j--;
        if (i <= j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
    if (start <= k && k <= j) {
        quickSelect(arr, start, j, k);
    } else if (i <= k && k <= end) {
        quickSelect(arr, i, end, k);
    }
}

let arr = [0,1,2,1];
let k = 1;
getLeastNumbers(arr, k);

