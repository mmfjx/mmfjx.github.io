class Promise{
    constructor(executor) {
        // 初始状态
        this.state = 'pending';
        // 成功的值
        this.value = null;
        // 失败的原因
        this.reason = null;
        this.onResolveCallbacks = [];
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

    }

}