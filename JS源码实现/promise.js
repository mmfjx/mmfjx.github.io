class Promise{
    constructor(executor) {
        // 初始状态
        this.state = 'pending';
        // 成功的值
        this.value = null;
        // 失败的原因
        this.reason = null;
        this.onResolveCallbacks = []; //
        this.onRejectedCallbacks = [];
        let resolve = (value) => {
            if(this.state === 'pending'){
                this.state = 'fulfilled';
                this.value = value;
                this.onResolveCallbacks.forEach(fn => fn());
            }
        };
        let reject = (reason) => {
            if(this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        try {
            executor(resolve, reject);
        }catch(err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        let promise2 = new Promise((resolve, reject) => {
            if(this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(err);
                    }
                }, 0);
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (this.state === 'pending') {
                this.onResolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                })
            }
        });
        return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new TypeError('循环引用'))
        }

        if ( x !== null &&(typeof x === 'object' || typeof x === 'function')) {
            let called; // 防止成功后调用失败
            try {
                let then = x.then;
                if (typeof then === 'function') {
                    then.call(x, (res) => {
                        if(called) {
                            return;
                        }
                        called = true;
                        resolvePromise(promise2, res, resolve, reject);
                    }, (reason) => {
                        if(called) {
                             return;
                        }
                        called = true;
                        reject(reason);
                    })
                } else {
                    resolve(x);
                }
            }catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            resolve(x);
        }
    }

}

Promise.all = function (promiseArr) {
    return new Promise(function (resolve, reject){
        let resArr = [];
        let count = 0;
        function processData(data, i) {
            resArr[i] = data;
            if (++count === promiseArr.length) {
                resolve(resArr);
            }

        }
        for(let i = 0; i< promiseArr.length; i++) {
            promiseArr[i].then((data) => {
                processData(data, i);
            }, reject);
        }
    })
}

Promise.race = function (promiseArr) {
    return new Promise((resolve, reject) => {
        for(let i = 0; i< promiseArr.length; i++) {
            promiseArr[i].then(resolve, reject);
        }
    })
}

Promise.resolve = function(value) {
    return new Promise((resolve, reject) => resolve(value));
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => reject(reason));
}



// async await 是promise语法糖
async function async1() {    
    console.log('async1 start');    
    await async2();    
    console.log('async1 end');
}
// 相当于
async function async1() {    
    console.log('async1 start');    
    Promise.resolve(async2()).then(() => {      
        console.log('async1 end');  
    })
}