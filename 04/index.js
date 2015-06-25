

/*
var arr = ['a', 'c', 'd'].map(function(e) {
  return e + '@';
});

console.log(arr);
*/



var fs = require('fs');

// promiseベースの関数
function read(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, { encoding: 'utf-8'}, function(err, result) {
      if (err) {
        return reject(err);
      }
      result = result.replace('\n', '');
      resolve(result);
    });
  });
}

var readPromises = ['a', 'b', 'c', 'd'].map(function(e) {
  return e + '.txt';
}).map(function(filename) {
  return read(filename);
});

Promise.all(readPromises).then(function(result) {
  console.log(result);
}).catch(function(err) {
  console.log(err);
});
/*
read('a.txt').then(function(result) {
  console.log(result);
  return read(result);
}).then(function(result) {
  console.log(result);
  return read(result);
}).then(function(result) {
  console.log(result);
  return read(result);
}).then(function(result) {
  console.log(result);
}).catch(function(err) {
  console.log(err);
});
*/
/*
// callbackを使ったパターン
fs.readFile('/a.txt', {encoding: 'utf-8'}, function(err, result1) {
    fs.readFile(result1, {encoding: 'utf-8'}, function(err, result2) {
        fs.readFile(result2, {encoding: 'utf-8'}, function(err, result3) {
            fs.readFile(result3, {encoding: 'utf-8'}, function(err, result4) {
                if (result4 === 'end') {
                  console.log('end');
                } else {
                  console.log('bad');
                }
            });
        });
    });
});
*/

// promise を使ったパターン

