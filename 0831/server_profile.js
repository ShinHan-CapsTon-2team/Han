const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./DB_Connect'); // Import the database connection

app.use(cors());
app.use(express.json());

app.post('/api/profileEdit', (req, res) => {
    const { nickname, introduction, career } = req.body;
  
    // MySQL에 프로필 정보 삽입 쿼리
    const insertQuery = `INSERT INTO profile (nickname , introduction , career) VALUES (?, ?, ?)`;
  
    // 프로필 정보 삽입
    connection.query(insertQuery, [nickname, introduction, career], (err, result) => {
      if (err) {
        console.error('프로필 정보 삽입 오류:', err);
        res.status(500).json({ message: '프로필 정보 삽입 실패' });
      } else {
        console.log('프로필 정보가 데이터베이스에 저장되었습니다.');
        res.status(200).json({ message: '프로필 정보 업데이트 완료' });
      }
    });
  });
  

const PORT = 4002;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 동작 중입니다.`);
});
