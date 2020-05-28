function *foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (var v of foo()) {
    console.log( v );
}
// 1 2 3 4 5

console.log( v ); // still `5`, not `6` :(


    function *foo(x) {
        var y = 2 * (yield (x + 1));
        var z = yield (y / 3);
        return (x + y + z);
    }

    var it = foo( 5 );

    // note: not sending anything into `next()` here
    console.log( it.next() );       // { value:6, done:false }
    console.log( it.next( 12 ) );   // { value:8, done:false }
    console.log( it.next( 13 ) );   // { value:42, done:true }


    http://objcer.com/2017/10/12/async-await-with-forEach/