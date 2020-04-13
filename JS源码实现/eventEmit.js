class EventEmit {
    constructor() {
        this.events = new Map();
    }

    $emit(type, ...args) {
        if (this.events.has(type)) {
            let cbs = this.events.get(type);
            if (Array.isArray(cbs)) {
                cbs.forEach(cb => {
                    cb.apply(this, args)
                });
            } else {
                cbs.apply(this, args);
            }
        }
    }

    $on(type, cb) {
        if (this.events.has(type)) {
            this.events.set(type, [].concat(this.events.get(type), cb));

        } else {
            this.events.set(type, cb);
        }
    }
}
