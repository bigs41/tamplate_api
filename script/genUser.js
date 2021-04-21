const users = []

function pad(n) {
  var s = "00000" + n;
  return s.substr(s.length - 5);
}

function randomPassword() {
  return Math.floor(100000 + Math.random() * 900000)
}

let i = 1

users.push({
  username: 'user' + pad(i),
  password: randomPassword()
})

console.log(users);