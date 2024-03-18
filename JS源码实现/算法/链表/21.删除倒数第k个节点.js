// 给定一个链表，请问如何删除链表中的倒数第k个节点？ 假设链表中节点的总数是n, 那么1<= k <= n, 要求只能遍历一次链表
// 思路：要求只能遍历一次，前后双指针 ，前指针先走k步，后指针再走, 中间相差k个节点，当前指针走到最后一个节点时，后指针刚好指向倒数第k个节点
const utils = require('./utils')
const { ListNode, createLinkedList, printLinkedList } = utils

let arr = [1, 2, 3, 4, 5]
let head = createLinkedList(arr)

function removeNthFromEnd(head, k) {
    // 哨兵节点
    let dummy = new ListNode(0)
    dummy.next = head
    let front = head
    let back = dummy
    for (let i = 0; i < k; i++) {
        front = front?.next
        if (!front) {
            return dummy.next
        }
    }

    while (front.next) {
        front = front.next
        back = back.next
    }
    back.next = back.next.next
    return dummy.next
}

printLinkedList(removeNthFromEnd(head, 0))
