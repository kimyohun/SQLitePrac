const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json()); // JSON 요청을 처리

// 모든 사용자 조회 API
app.get('/users', (req, res) => {
  db.getUsers((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 사용자 추가 API
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  db.addUser(name, age, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User added successfully!" });
  });
});

// DB 서버 실행
app.listen(4000, () => {
  console.log('DB Server running on port 4000');
});
