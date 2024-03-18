// https://leetcode-cn.com/problems/reverse-linked-list/
var reverseList = function(head) {
    if (!head.next) return head;
    let pre = null;
    let cur = head;
    while(cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    head = pre;
    return head;
}


var reverseList = function(head) {
    if (!head.next) return head;
    return reverse(head, null);
}

function reverse(cur , pre) {
    if (!cur) return pre;
    if (cur) {
        let next = cur.next;
        cur.next = pre;
        return reverse(next, cur);
    }
}
