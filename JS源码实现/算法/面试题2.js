const Foo = (function() {
  let val = 0
  return function () {
    val += 1;
      return {
        val
      }
  }
})();

let a1 = new Foo();
let a2 = Foo();
// console.log(a2 instanceof Object)
let a3 = new Foo();

console.log(a1.val); // 1
console.log(a2.val); // 2
console.log(a3.val); // 3


// 如何实现a == 1 && a == 2 && a == 3为true

var a = [1, 2, 3];
// a.valueOf = a.shift;
a.toString = a.shift;
console.log(a.toString() == 1); // tru

console.log(a == 1 && a == 2 && a == 3); // tru
