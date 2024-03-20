// 请实现如下类型 MovingAverage，计算滑动窗口中所有数字的平均值，该类型构造函数的参数确定滑动窗口的大小，每次调用成员函数next时会在滑动窗口中添加一个整数，并返回滑动窗口中所有数字的平均值

// 思路：滑动窗口，先加入窗口的数字会先出，符合队列的特性，滑动时，需要注意窗口是否已满，计算平均值时，可以用sum + 移动的数字，如果窗口满了，再 - 移出的数字

const Queue = require('./queue')

class MovingAverage {
    queue = null
    size = 0
    sum = 0
    constructor(size) {
        this.size = size
        this.queue = new Queue()
    }

    next(val) {
        if (this.queue.size >= this.size) {
            const shift = this.queue.dequeue()
            this.sum -= shift
        }
        this.queue.enqueue(val)
        this.sum += val
        return this.sum / this.queue.size
    }
}

const mv = new MovingAverage(3)
console.log(mv.next(1))
console.log(mv.next(2))
console.log(mv.next(3))
console.log(mv.next(4))
