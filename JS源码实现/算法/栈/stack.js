class Stack {
    constructor() {
        this.items = []
    }

    push(val) {
        this.items.push(val)
    }

    pop() {
        return this.items.pop()
    }

    get peer() {
        return this.items[this.items.length - 1]
    }

    get isEmpty() {
        return !this.items.length
    }

    get size() {
        return this.items.length
    }

    clear() {
        this.items = []
    }

    print() {
        return this.items.toString()
    }
}

module.exports = Stack
