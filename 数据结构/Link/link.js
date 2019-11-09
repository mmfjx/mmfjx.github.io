class Node {
    constructor(ele) {
        this.node = ele;
        this.next = null;
    }
}
export default class Link {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    // 添加节点
    append(ele){
        let newNode = new Node(ele);
        if (!this.head) {
            this.head = newNode;
        } else {
            let node = this.head;
            while(node.next) {
                node = node.next;
            }
            node.next = newNode;
        }
        this.length++;
    }


    // 在position的位置插入节点
    insert(ele, position){
        if (position > this.length - 1 || position < 0) {
            return false
        } else {
            let newNode = new Node(ele);
            let node = this.head;
            if (position === 0) {
                this.head = newNode;
                newNode.next = node;
                return true;
            } else {
                for(let i = 1; i< position; i ++ ) {
                    node = node.next;
                }
                let orgNode = node.next;
                node.next = newNode;
                newNode.next = orgNode;
                this.length ++ ;
                return true;
            }
        }

    }

    // 移除指定位置的节点
    removeAt(position) {
        if (position > this.length - 1 || position < 0) {
            return null
        } else {
            let node = this.head;
            if (position === 0) {
                this.head = node.next;
                this.length-- ;
                return node;
            } else {
                for(let i = 1; i< position; i ++ ) {
                    node = node.next;
                }
                let orgNode = node.next;
                node.next = orgNode.next;
                this.length-- ;
                return node;
            }

        }

    }

    // 查找元素下标
    findIndex(ele) {
        let index = 0;
        let node = this.head;
        while(node && node.node !== ele){
            node = node.next;
            index++;
        }
        if (index >= this.length){
            return -1;
        }
        return index;
    }

    // 删除指定节点
    remove(ele){
        let removeIndex = this.findIndex(ele);
        return this.removeAt(removeIndex);
    }

    get size() {
        return this.length;
    }

    // 转为字符串
    toString(){
        let node = this.head;
        let str = '';
        while(node) {
            str += `${node.node}, `
            node = node.next;
        }

        return str;
    }
}