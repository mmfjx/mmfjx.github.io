// 给定两个表示非负整数的单向链表，请问如何实现两个整数的相加并把它们的和仍然用单向链表表示？链表中的每个节点表示整数十进制的一位，并且头节点对应整数的最高数而为节点对应整数的个数
// 思路：因整数相加有进位的可能，所以还是从右侧相加，对两链表反转, 最后对和的链表再反转
const utils = require('./utils')
const { ListNode, createLinkedList, printLinkedList } = utils

let arr1 = [1, 2, 3, 4, 5, 6]
let head1 = createLinkedList(arr1)
let arr2 = [8, 9, 2, 6, 5, 9]
let head2 = createLinkedList(arr2)
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

function fn1(head1, head2) {
    const reserveHead1 = reserveLinkedList(head1)
    const reserveHead2 = reserveLinkedList(head2)
    let node1 = reserveHead1
    let node2 = reserveHead2
    let head = new ListNode(0)
    let add = 0
    let node = head
    while (node1 && node2) {
        let sum = node1.val + node2.val + add
        if (sum >= 10) {
            add = 1
            sum = sum - 10
        } else {
            add = 0
        }
        const temp = new ListNode(sum)
        node.next = temp
        node = temp
        node1 = node1.next
        node2 = node2.next
    }
    if (add) {
        const temp = new ListNode(add)
        node.next = temp
        node = temp
    }

    return reserveLinkedList(head.next)
}
printLinkedList(fn1(head1, head2))
