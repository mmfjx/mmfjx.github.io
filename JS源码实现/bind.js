Function.prototype.bind = function (context) {
    let self = this;
    return function () {
        return self.prototype.apply(context, arguments);
    }
}