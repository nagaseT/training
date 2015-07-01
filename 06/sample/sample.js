/*
class Database {
  constructor() {
    console.log('init');
  }

  connect() {
    console.log('connect');
    fs.readFile('file.js', (err, result) => {
      this
    });
  }

  login() {
    console.log('login');
  }
}

var db = new Database();
db.connect();

*/

/* 
// arrow
var sum = (a, b) => a + b;
console.log(sum(10, 20));

// ECMAScript 5
var result = [1, 2, 3].map(function(e) {
  return e * 2;
});
// ECMAScript 6
var result2 = [1,2,3].map((e) => e * 2);
// 引数の（）は必ず作る
console.log(result);
console.log(result2);

*/

/* 
//let
function foo() {
  let a = 10;
  if(true) {
    let a = 11;
    console.log(a);
  }
  console.log(a);
}

foo();
*/

/*
function max(...a) {
  console.log(a);
}
let nums = [1,2,3,4];
//max(1,2,3,4);
max(...nums);
*/

/*
// short hand & destructuring
let username = req.body.username;
let password = req.body.password;
let params = {username, password};
let errors = hoge(params);

function hoge({username, password}) {
  console.log(username, password);
}
*/


// template literal
var name = 'soneda';
console.log('I am ' + name);
console.log(`I am ${name}`);

  // 複数行の連結が簡単に！
console.log(`
  <div>
    <p> ${name} </p>
  </div>
`);



