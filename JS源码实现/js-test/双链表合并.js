// 两个有序单链表的合并：

// 举例：



// a: 1->3->5

// b: 2->4->6->7

// c： 1->2->3->4->5->6->7



function merge(a, b) {
    if (!a) return b;
    if (!b) return a;
    if (a.val <= b.val) {
        a.next = merge(a.next, b);
        return a;
    } else {
        b.next = merge(a, b.next);
        return b;
    }

 }


