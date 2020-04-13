// let obj = {
//     singer: 'zs'
// };
// let song = '大鱼';

// Object.defineProperty(obj, 'music', {
//     // 如果不指定configurable, writable, enumerable ，则这些属性默认值为false，如果不指定value, get, set，则这些属性默认值为undefined
//     enumerable: true,
//     configurable: true,
//     // writable: true, // writable、value和get、set不能同时设置
//     get() {
//         return song;
//     },
//     set(value){
//         song = value;
//     }
// })

// console.log(obj.music);
// obj.music = 'dlbb';
// console.log(obj.music);

// https://juejin.im/post/5abdd6f6f265da23793c4458
function Mvvm(options = {}){
    this.$options = options;
    let data = this._data = this.$options.data;

    // 数据劫持
    observe(data);
    // 数据代理， this代理了this._data
    for(let key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        })
    }
    if (options.computed) {
        initComputed.call(this);

    }
    // 编译
    new Compile(options.el, this);
    if (options.mounted) {
        options.mounted.call(this);
    }

}

function initComputed(){
    let vm = this;
    let computed = this.$options.computed;
    Object.keys(computed).forEach(key => {
        Object.defineProperty(vm, key, {
            get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
            set(){}
        });
    });
}

function Observe(data) {
    let dep = new Dep();
    for (let key in data){
        let val = data[key];
        observe(val);
        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                // console.log(Dep, Dep.target, key)
                console.log(dep.subs,Dep.target,  key, val)
                return val;
            },
            set(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                observe(newVal);
                dep.notify();
            }
        })
    }
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    return new Observe(data);
}

// 编译
function Compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();

    while(child = vm.$el.firstChild) {
        fragment.append(child);
    }

    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;
            if (node.nodeType === 1) { // 元素节点
                let nodeAttr = node.attributes;
                Array.from(nodeAttr).forEach(attr => {
                    let name = attr.name;
                    let exp = attr.value;
                    if(name.includes('v-')) {
                        node.value = vm[exp];
                    }

                    // 监听变化
                    new Watcher(vm, exp, function(newVal){
                        node.value = newVal;
                    });

                    node.addEventListener('input', e =>{
                        let newVal = e.target.value;
                        vm[exp] = newVal;
                        console.log(vm, 'input')
                    });
                });
            }
            if (node.nodeType === 3 && reg.test(txt)) { // 文本节点、又有大括号
                // console.log(RegExp.$1);
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(key => {
                    val = val[key];
                })
                node.textContent = txt.replace(reg, val).trim();

                // 监听变化
                new Watcher(vm, RegExp.$1, newVal => {
                    node.textContent = txt.replace(reg, newVal).trim();
                })
            }
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        });
    }

    replace(fragment);

    vm.$el.appendChild(fragment);
}

// 发布订阅模式  订阅是数组中的函数，发布时执行数组中的函数，[fn1, fn2, fn3]

function Dep(params) {
    this.subs = [];
}

Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub);
    },
    notify() {
        this.subs.forEach(sub => sub.update());
    }
};

// 监听函数， 通过Watcher这个类创建的实例都有update方法
function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.exp = exp;

    Dep.target = this;
    let arr = exp.split('.');
    let val = vm;
    // 触发get
    arr.forEach(key => {
        val = val[key];
    });
    console.log('get 1', val)
    Dep.target = null;
}

Watcher.prototype.update = function() {
    let arr = this.exp.split('.');
    let val = this.vm;
    // 触发get
    arr.forEach(key => {
        val = val[key];
    })
    console.log('get 2')
    this.fn(val);
}

// let watcher = new Watcher(() => console.log(111));

// let dep = new Dep();
// dep.addSub(watcher);
// dep.addSub(watcher);
// dep.notify();

