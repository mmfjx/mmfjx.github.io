// 如果一个链表中包含环，那么应该如何找出环的入口节点？链表的头节点顺着next指针方向进入环的第1个节点为环的入口节点
// 思路：

const utils = require('./utils')
const { ListNode, createLinkedList, printLinkedList } = utils

let arr = [1, 2, 3, 4, 5, 6]
let head = createCycleLinkedList(arr, 3)
