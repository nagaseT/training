// User

// コンストラクタ関数
// × User()
// ○ new User()
function User(name) {
  this.name = name;
}

// メソッド
User.prototype.hello = function() {
  console.log('I\'m', this.name);
}

User.prototype.foo = function() {};
User.prototype.bar = function() {};


var soneda = new User('soneda');
soneda.hello();

var nagase = new User('nagase');
nagase.hello();