const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json()); // JSON 요청을 처리
app.use('/users', usersRouter); // 사용자 라우터 등록

// 앱 서버 실행
app.listen(3000, () => {
  console.log('App Server running on port 3000');
});
