// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后的链表的表头
// 思路：
// 1.简单思路，用栈，先进后出，构成新的链表, 时间O(2m) 空间O(m)
// 2. 遍历一次，指针反转，用三指针
const utils = require('./utils')
const { ListNode, createLinkedList, printLinkedList } = utils

let arr = [1, 2, 3, 4, 5, 6]
let head = createLinkedList(arr)

function reserveLinkedList(head) {
    let pre = null
    let cur = head
    while (cur) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}

console.log(reserveLinkedList(head))
