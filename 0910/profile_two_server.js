const express = require('express');
//const qs = require('querystring');
const cors = require('cors');
//const cookie = require('cookie'); // 추가된 부분
const connection = require('./DB_Connect'); 

const app = express();
const port = 4003;


app.use(cors());
app.use(express.json()); // JSON 요청 바디를 파싱하기 위해 추가


// 프로필 정보 가져오기
// 게시글의 ID를 기반으로 사용자 프로필 정보를 가져오는 엔드포인트
//app.get('/api/profile/:userId', (req, res) => {
//    const id = req.params.id; // 클라이언트에서 받은 id
//    console.log(id);
  
    // 게시글의 ID를 사용하여 해당 게시글의 작성자의 이메일을 가져오는 쿼리
//    const userEmailQuery = `
//      SELECT email
//      FROM your_post
//      WHERE id = ?
//    `;
   
  
    // 이메일을 사용하여 사용자의 ID를 가져오는 쿼리
//    const userIdQuery = `
//      SELECT id
//      FROM users
//      WHERE email = (
 //       ${userEmailQuery}
//      )
//    `;

 //   console.log(userIdQuery);

    // 사용자의 ID를 사용하여 프로필 정보를 가져오는 쿼리
 //   const userProfileQuery = `
 //     SELECT
 //       users.id,
 //       users.email,
 //       users.nickname,
 //       profiles.introduction,
 //       profiles.career
 //     FROM
  //      users
  //    LEFT JOIN
  //      profiles ON users.id = profiles.user_id
  //    WHERE
  //      users.id= (
  //        ${userIdQuery}
  //      )
  //  `;
  
  //  connection.query(userProfileQuery, [id], (err, rows) => {
  //    if (err) {
  //      console.error('Error executing query:', err);
  //      res.status(500).json({ error: 'Internal server error' });
  //      return;
  //    }
  
  //    if (rows.length === 0) {
  //      res.status(404).json({ error: 'User profile not found' });
  //    } else {
  //      const userProfile = rows[0];
  //      userProfile.userId = id;
  //      res.json(userProfile);
  //      console.log(userProfile);
  //      console.log(rows[0]);
  //    }
  //  });
//});

  
// app.get('/api/profile/:user_Id', (req, res) => {
  
//     // MySQL 쿼리 실행
//     const query = `
//     SELECT 
//      user_id
//     FROM 
//       profiles
//     WHERE
//       u.id = ?;
//     `;
  
//     connection.query(query, [userId], (err, rows) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }
  
//       if (rows.length === 0) {
//         res.status(404).json({ error: 'User not found' });
//       } else {
//         res.json(rows);
//         console.log(rows);
//       }
//     });
//   });

// // 다른 사용자의 프로필을 가져오는 엔드포인트
// app.get('/api/profile/:userId', (req, res) => {
//     const userId = req.params.userId;
//     console.log(userId);
  
//     // MySQL 쿼리 실행
//     const query = `
//     SELECT 
//       p.image_url AS post_image_url
//     FROM 
//       your_post AS p
//     JOIN 
//       users AS u ON p.email = u.email
//     WHERE
//       u.id = ?;
//     `;
  
//     connection.query(query, [userId], (err, rows) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }
  
//       if (rows.length === 0) {
//         res.status(404).json({ error: 'User not found' });
//       } else {
//         res.json(rows);
//         console.log(rows);
//       }
//     });
//   });

app.post('/api/profiles/:id', (req, res) => {
  const id = req.params.id; // 클라이언트에서 받아온 게시글의 id

  // your_post 테이블에서 postId에 해당하는 이메일을 찾습니다.
  const findEmailQuery = `SELECT email FROM your_post WHERE id = ?`;
  connection.query(findEmailQuery, [id], (err, result) => {
    if (err) {
      console.error('Error finding email:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    if (result.length === 0) {
      console.log('Post not found for ID:', id);
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const userEmail = result[0].email;
    console.log('Found email:', userEmail);

    // 클라이언트에게 userEmail을 응답으로 보냅니다.
    res.json({ userEmail: userEmail });
  });
});



// app.get('/api/profile/:id', (req, res) => {
//   const id = req.params.id; // 클라이언트에서 받은 사용자 id
//   console.log('id : ', id);

//   // users 테이블에서 ID에 해당하는 사용자의 정보를 가져옵니다.
//   const findUserQuery = 'SELECT * FROM users WHERE id = ?';
//   connection.query(findUserQuery, [id], (err, userResult) => {
//     if (err) {
//       res.status(500).json({ error: 'Database error' });
//       return;
//     }

//     if (userResult.length === 0) {
//       res.status(404).json({ error: 'User not found' });
//       return;
//     }

//     const user = userResult[0];
//     const userId = user.id;

//     // profiles 테이블에서 user_id에 해당하는 프로필 정보를 가져옵니다.
//     const findUserProfileQuery = 'SELECT * FROM profiles WHERE user_id = ?';
//     connection.query(findUserProfileQuery, [userId], (err, profileResult) => {
//       if (err) {
//         res.status(500).json({ error: 'Database error' });
//         return;
//       }

//       if (profileResult.length === 0) {
//         res.status(404).json({ error: 'User profile not found' });
//         return;
//       }

//       const userProfile = profileResult[0];

//       // 필요한 데이터를 클라이언트에 전송합니다.
//       res.json({
//         id: user.id,
//         email: user.email,
//         nickname: user.nickname,
//         introduction: userProfile.introduction,
//         career: userProfile.career,
//       });
//     });
//   });
// });


app.get('/api/profile/:emailId', (req, res) => {
  const emailId = req.params.emailId;
  console.log('Received id:', emailId);

  // 게시글 이미지와 id
  const findImagesQuery = `SELECT id, image_url FROM your_post WHERE email LIKE ?`;
  connection.query(findImagesQuery, [`${emailId}@%`], (err, images) => {
    if (err) {
      console.error('Error fetching images:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    // 프로필 정보
    const findUserQuery = `SELECT nickname, email FROM users WHERE email LIKE ?`;
    connection.query(findUserQuery, [`${emailId}@%`], (err, userData) => {
      if (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }

      if (userData.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const { nickname, email } = userData[0];

      // Fetch user ID
      const findUserIdQuery = `SELECT id FROM users WHERE email LIKE ?`;
      connection.query(findUserIdQuery, [`${emailId}@%`], (err, result) => {
        if (err) {
          console.error('Error fetching user ID:', err);
          res.status(500).json({ error: 'Database error' });
          return;
        }

        if (result.length === 0) {
          res.status(404).json({ error: 'User not found' });
          return;
        }

        const userId = result[0].id;

        // Fetch profile data (introduction and career)
        const findProfileQuery = `SELECT introduction, career FROM profiles WHERE user_id = ?`;
        connection.query(findProfileQuery, [userId], (err, profileData) => {
          if (err) {
            console.error('Error fetching profile data:', err);
            res.status(500).json({ error: 'Database error' });
            return;
          }

          if (profileData.length === 0) {
            res.status(404).json({ error: 'Profile not found' });
            return;
          }

          const profile = profileData[0];

          // 모든 데이터터
          res.json({
            id: images.map(image => image.id), // Add id property to the response
            images: images.map(image => image.image_url), // Extract image URLs
            nickname,
            email,
            introduction: profile.introduction,
            career: profile.career
          });
        });
      });
    });
  });
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });