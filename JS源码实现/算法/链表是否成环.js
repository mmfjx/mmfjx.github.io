
// https://leetcode-cn.com/problems/linked-list-cycle/submissions/
var hasCycle = function(head) {
    // 解法一： 标记法，遍历节点，添加flag

    // while(head) {
    //     if (head.flag) return false;
    //     head.flag = true;
    //     head = head.next;
    // }
    // return false;


    // 解法二： 快慢双指针 ，如果有环， 两指针肯定会相遇

    if (!head || !head.next) return false;
    let fast = head.next.next;
    let slow = head.next;
    while(fast && fast.next) {
        if (fast === slow) return true;
        fast = fast.next.next;
        slow = slow.next;
    }
    return false;


    // 解法三  利用JSON.stringify() 不能序列化含有循环引用的结构

    // try {
    //         JSON.stringify(head);
    //         return false;
    // }catch(err){
    //     return true;
    // }


}