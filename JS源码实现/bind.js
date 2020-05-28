Function.prototype.bind = function (context) {
    let self = this;
    return function () {
        return self.prototype.apply(context, arguments);
    }
}



function Student(name) {
    this.name  = name;
    return this;
}

var student1 = new Student('my');
student1._proto_ === Student.prototype;



function newOpera(ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new Error('first param must be  a function');
    }

    let newObject = Object.create(ctor.prototype)

    const argsArr = Array.from(args);

    let resultObj = ctor.apply(newObject, argsArr);

    if ((resultObj !== null && typeof resultObj === 'object') || typeof resultObj === 'function') {
        return resultObj;
    }
    return newObject;
}


Function.prototype.applyFn = function (thisArg, argsArr) {
    if (typeof this !== 'function') {
        throw new Error('this must be a function');
    }

    if (!argsArr) {
        argsArr = [];
    }

    if (typeof argsArr !== 'object') {
        throw new Error('argsArr must be a object');
    }

    if (thisArg === 'undefined' || thisArg === null) {
        thisArg = window;
    }

    // const fn = new Symbol();


    thisArg['fn'] = this;

    let res = thisArg['fn'](...argsArr);
    delete thisArg.fn;
    return res;
}


Function.prototype.callFn = function (thisArg, ...arg) {
    let context = thisArg || window;
    context['fn'] = this;
    let res = context['fn'](...arg);
    delete context.fn;
    return res;
}

// 函数节流 (针对函数频繁调用的场景，改为定时调一次)
function throttle(fn, delayTime) {
    let isFirst = true;
    let timer = null;
    let _fn = fn;
    return function() {
        let that = this;
        let args = arguments;
        if (isFirst) {
            isFirst = false;
            return _fn.apply(that, args);
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(() => {
            clearTimeout();
            timer = null;
            _fn.apply(that, args)
        }, delayTimer);
    }
}

// 函数防抖（针对用户输入类似的事件，延迟n秒之后再触发执行函数，如果在n秒之后再次触发，则重新计时）

function debounce(fn , delayTime) {
    let that = this;
    let timer = null;
    return function(args){
        let _args = args;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(that, _args)
        }, delayTime);
    }
}

