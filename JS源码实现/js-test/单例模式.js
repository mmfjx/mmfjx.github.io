const singleInstance = (function() {
    let instance = null;
    return function() {
        if (!instance) {
            instance = new STD();
        }
        return instance;
    }

})();

class STD {
    constructor(){
        this.val = 2;
    }
}