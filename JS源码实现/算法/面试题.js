// function async([
//     done => { setTimeout(() => done(1), 2000) },
//     done => { setTimeout(() => done(2), 1000) },
//     done => { setTimeout(() => done(3), 3000) },
//     ], res => console.log(res)){
//     }

// function async(arr, cb) {
//     const res = [];
//     let it = 0;

//     function ps(i) {
//         let done = function(val) {
//             res[i] = val;
//             it++;
//             if (it === arr.length -1) {
//                 cb(res);
//             }

//         }
//         arr[i](done);
//     }
//    for(let i = 0; i < arr.length; i++) {
//     res.push(new Promise((resolve, reject) => {
//         ps()
//     }))
// }

// }

// const ps = done => {

//     setTimeout(() => {
//         done(1);
//     }, 1000);
// }

// new Promise((resolve, reject) => {
//     ps(
// })

function parallel(callbacks, response) {
    var it = 0;
    var store = [];
    var async = function (ix) {
      var done = function (data) {
        if (data !== null && data !== undefined) store[ix] = data;
        if (it < callbacks.length -1) it++;
        else {
          if (typeof response === 'function') response(store);
        }
      };
    //   setTimeout(function () {
        callbacks[ix](done);
    //   }, 0);

    };

    if (callbacks instanceof Array) {
      for (var i = 0; i < callbacks.length; i++) {
            async(i);
      }
    }
  }

  parallel([
    done => {
      setTimeout(() => {
        console.log(`hi 3!`)
        done(`a`)
      }, 3000)
    },
    done => {
      setTimeout(() => {
        console.log(`hi 2!`)
        done(`b`)
      }, 2000)
    },
    done => {
      setTimeout(() => {
        console.log(`hi 1!`)
        done(`c`)
      }, 1000)
    }
  ],data => {
    console.log(`End: ${JSON.stringify(data)}`)
  })