function test() {
    try {
        debugger
        console.log(1);
        setTimeout(() => {
            try {
                throw new Error('throw');
                console.log('try');
            } catch (err) {
                console.log('错误', err, 'st try');
                return err;
            }
        }, 1000);

    } catch (e) {
        debugger;
        console.log(e.message, 'catch');
    }
    debugger;
    console.log('finally');
}

console.log(test());