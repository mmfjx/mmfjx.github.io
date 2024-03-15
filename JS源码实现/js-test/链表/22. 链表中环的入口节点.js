// 如果一个链表中包含环，那么应该如何找出环的入口节点？链表的头节点顺着next指针方向进入环的第1个节点为环的入口节点
// 思路：快慢双指针，快指针走两步，慢指针走一步，如果两指针相遇，表示有环；
// 判断环入口节点：
// 方法1：从相遇节点开始计数，绕环一圈，回到相遇的节点，就是环的节点数k，知道环的数据量后，另起两指针，都指向头节点，一指针先走k步，另一指针再一起走，两指针相遇的节点即环的入口节点（因为前一指针已经绕了一圈了，回到环的入口节点了）
// 方法2： 无需感知环的节点数，因为快慢指针相遇时，慢指针所走的步数即是k的倍数，直接另起一指针从头节点开始和慢指针一起走，两指针相遇的点就是环的入口节点（因为慢指针绕一圈也是k的正数倍）
const utils = require('./utils')
const { ListNode, createCycleLinkedList, printLinkedList } = utils

let arr = [1, 2, 3, 4, 5, 6]
let head = createCycleLinkedList(arr, 2)

function detectCycle(head) {
    if (!head || !head.next) {
        return null
    }

    let slow = head.next
    let fast = slow.next
    while (fast && slow) {
        if (fast === slow) {
            return slow
        }
        slow = slow.next
        fast = fast.next
        if (fast) {
            fast = fast.next
        }
    }
    return null
}

// 方法1
function fn1(head) {
    const meetNode = detectCycle(head)
    if (!meetNode) {
        return null
    }
    // 计算环的节点数, 绕环一周
    let count = 1
    let node = meetNode.next
    while (node !== meetNode) {
        count++
        node = node.next
    }

    // console.log(meetNode, count)

    //前后指针
    let front = head
    let back = head
    for (let i = 0; i < count; i++) {
        if (front) {
            front = front.next
        }
    }

    while (front !== back && front && back) {
        front = front.next
        back = back.next
    }
    return back
}

console.log('fn1', fn1(head))

function fn2(head) {
    let meetNode = detectCycle(head)
    let node = head
    while (node !== meetNode) {
        node = node.next
        meetNode = meetNode.next
    }
    return node
}

console.log('fn2', fn2(head))
