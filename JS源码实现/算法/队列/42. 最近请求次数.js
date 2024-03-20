// 请实现如下类型RecentCounter，它是统计过去3000ms内的请求次数的计数器，该类型的构造函数初始化计数器为0，函数ping(t)在时间t添加一个新请求（t表示以毫秒为单位的时间），并返回过去3000ms内（时间范围为[t-3000,t]）发生的所有请求数，假设每次调用函数ping的参数t都比之前调用的参数值大

//思路：3000ms内的请求数，3000ms之前的请求丢掉，符合队列的先入先出，和题41类型
const Queue = require('./queue')

class RecentCounter {
    queue = null
    windowSize = 0
    sum = 0
    constructor(windowSize) {
        this.windowSize = windowSize
        this.queue = new Queue()
    }

    ping(t) {
        this.queue.enqueue(t)
        if (this.queue.front() + this.windowSize < t) {
            this.queue.dequeue()
        }

        return this.queue.size
    }
}

const mv = new RecentCounter(3000)
console.log(mv.ping(1000))
console.log(mv.ping(2000))
console.log(mv.ping(3000))
console.log(mv.ping(4000))
console.log(mv.ping(5000))
