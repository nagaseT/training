var testCase1 = validation({ username: 'aaaaaaaaaaaaaaaa', password: 'aaaaaaaa'});
console.log(testCase1[0] === USERNAME_CHECK.numberErrorMessage);

var testCase2 = validation({ username: 'a', password: 'aaaaaaaa'});
console.log(testCase2[0] === USERNAME_CHECK.numberErrorMessage);

var testCase3 = validation({ username: 'aaaa', password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'});
console.log(testCase3[0] === PASSWORD_CHECK.numberErrorMessage);

var testCase4 = validation({ username: 'aaaa', password: 'aaaaa'});
console.log(testCase4[0] === PASSWORD_CHECK.numberErrorMessage);

var testCase5 = validation({ username: '', password: ''});
console.log(testCase5[0] === USERNAME_CHECK.numberErrorMessage);
console.log(testCase5[1] === PASSWORD_CHECK.numberErrorMessage);