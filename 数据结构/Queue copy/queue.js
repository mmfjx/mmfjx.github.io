export default class Queue {
    constructor(items) {
        this.items = items || [];
    }

    enqueue(val) {
        this.items.push(val);
    }

    dequeue(){
        this.items.shift();
    }

    front() {
        return this.items[0];
    }

    get isEmpty() {
        return !this.items.length;
    }

    get size() {
        return this.items.length;
    }

    clear() {
        this.items= [];
    }

    print() {
        return this.items.toString();
    }
}