const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// 사용자 테이블 생성
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  )`);
});

// 사용자 데이터 추가 함수
function addUser(name, age, callback) {
  db.run("INSERT INTO users (name, age) VALUES (?, ?)", [name, age], callback);
}

// 모든 사용자 가져오기 함수
function getUsers(callback) {
  db.all("SELECT * FROM users", [], callback);
}

// 모듈 내보내기
module.exports = { addUser, getUsers };
