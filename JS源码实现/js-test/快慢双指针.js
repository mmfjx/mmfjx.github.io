// 对于链表，只有头，获取某个节点信息，可以考虑快慢双指针的方式，遍历一次获取
// 例如：给定一个带有头结点 head 的非空单链表，返回链表的中间结点。如果有两个中间结点，则返回第二个中间结点。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;
    // 快指针是慢指针的两倍，所以刚好返回一半
    while(fast &&  fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;

};