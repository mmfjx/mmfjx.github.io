function ListNode(val) {
    this.val = val
    this.next = null
}
function createLinkedList(arr) {
    if (arr.length === 0) {
        return null
    }
    let head = new ListNode(arr[0])
    let current = head
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i])
        current = current.next
    }
    return head
}
function createCycleLinkedList(arr, pos) {
    if (arr.length === 0) {
        return null
    }
    let head = new ListNode(arr[0])
    let current = head
    let cycleNode = null
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i])
        current = current.next
        if (i === pos) {
            cycleNode = current
        }
    }
    current.next = cycleNode
    return head
}
function printLinkedList(head) {
    let current = head
    while (current != null) {
        console.log(current.val)
        current = current.next
    }
}

module.exports = {
    ListNode,
    createLinkedList,
    createCycleLinkedList,
    printLinkedList,
}
