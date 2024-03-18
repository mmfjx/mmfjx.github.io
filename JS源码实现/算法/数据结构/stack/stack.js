export default class Stack {
    constructor() {
        this.items = [];
    }

    push(val) {
        this.items.push(val);
    }

    pop(){
        this.items.pop();
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