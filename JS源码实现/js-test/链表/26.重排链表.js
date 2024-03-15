// 给定一个链表，链表中节点的顺序是L0->L1->L2->L3->L4->L5->...->Ln，请问如何重排使节点的顺序变成L0->Ln->L1->Ln-1->L2->Ln-2->...
// 思路：观察重排后的顺序，是把原链表折成两半后，后半段需反转再拼接在一起的，因此，需先找到中间节点，再断开，找中间节点，可以用快慢指针，快指针走两步，慢指针走一步，当快指点到尾节点时，慢指针刚好在中间节点
const utils = require('./utils')
const { ListNode, createLinkedList, printLinkedList } = utils

let arr = [1, 2, 3, 4, 5, 6, 7]
let head = createLinkedList(arr)

function splitLinkedList(head) {
    if (!head) {
        return null
    }
    let slow = head.next
    let fast = slow.next
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next
        if (fast.next) {
            fast = fast.next
        }
    }
    // 断开link
    let newHead = slow.next
    slow.next = null
    return {
        head1: head,
        head2: newHead,
    }
}

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

function reOrder(head) {
    let { head1, head2 } = splitLinkedList(head)
    head2 = reserveLinkedList(head2)
    let node1 = head1
    let node2 = head2
    while (node1 && node2) {
        const next1 = node1.next
        let next2 = null

        next2 = node2?.next
        node1.next = node2
        node2.next = next1
        node2 = next2
        node1 = next1
    }
    return head1
}

printLinkedList(reOrder(head))
