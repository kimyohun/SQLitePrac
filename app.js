const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.sqlite');

db.serialize(() => {
  // 테이블 생성 (Create)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  )`);

  // 데이터 추가 (Create)
  db.run(`INSERT INTO users (name, age) VALUES ('Alice', 30)`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('데이터 추가 성공');
    }
  });

  // 데이터 조회 (Read)
  db.each(`SELECT id, name, age FROM users`, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(row.id + '\t' + row.name + '\t' + row.age);
    }
  });

  // 데이터 수정 (Update)
  db.run(`UPDATE users SET age = 31 WHERE name = 'Alice'`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('데이터 수정 성공');
    }
  });

  // 데이터 삭제 (Delete)
  db.run(`DELETE FROM users WHERE name = 'Alice'`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('데이터 삭제 성공');
    }
  });
});

db.close();

