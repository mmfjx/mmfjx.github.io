var sleep = function(delayTime) {
    setTimeout(() => {

    }, delayTime);
    return {
        catch: function(fn) {
            fn.call(null, delayTime);
        }
    }
}


console.log(sleep(4).catch(console.log));
console.log(sleep(5).catch(console.log));
console.log(sleep(4));
