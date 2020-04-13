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

