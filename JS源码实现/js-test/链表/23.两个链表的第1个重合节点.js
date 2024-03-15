// 输入两个单向链表，请问如何找出它们的第1个重合节点
// 思路：
// 方法1：两个单向链表有重合节点，那意味着链表尾部肯定是一直重合的，可以把链表1的尾节点的next指向链表2的头节点，形成一个环，接下来就是求环的入口节点，同题22一样
// 方法2：两个单向链表有重合节点，那意味着链表尾部肯定是一直重合的, 可以挨个遍历链表，用栈存储节点，按照先进后出的原理，最后一个相同的节点从栈取出的就是第1个重合节点
// 方法3：因尾部是重合的，所以两链表差异在头部，假设链表1是m长度，链表2是n长度，m > n, 用两个指针分别指向两链表的头节点，指向链表1的指针先走m-n步，然后两指针一起同步走，那么第一个相同节点即第1个重合节点
const utils = require('./utils')
const { ListNode, createLinkedList } = utils

let arr1 = [1, 2, 3, 4, 5, 6]
let arr2 = [7, 8, 4, 5, 6]
let head1 = createLinkedList(arr1)
let head2 = createLinkedList(arr2)

function countList(head) {
    let count = 0
    let node = head
    while (node) {
        count++
        node = node.next
    }
    return count
}
function fn3(head1, head2) {
    // 获取链表长度
    const m = countList(head1)
    const n = countList(head2)

    let longList = m >= n ? head1 : head2
    let shortList = m >= n ? head2 : head1
    let k = Math.abs(m - n)
    // 两指针
    let front = longList
    for (let i = 0; i < k; i++) {
        front = front.next
    }
    let back = shortList
    console.log(front, back)
    while (front.val !== back.val) {
        // 应该是下面的，但js不是一个对象，无法相等，所以取value
        // while (front === back) {
        front = front.next
        back = back.next
    }
    return back
}
console.log(fn3(head1, head2))
