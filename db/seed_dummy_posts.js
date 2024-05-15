require('dotenv').config();

const db = require('./index.js');

const sql = `
  INSERT INTO images
    (image_url, user_id, post_id)
  VALUES
    ($1, $2, $3);
`;


const userId = 1;  
const postId = 1;  

const items = [
  {
    imageUrl: "https://fakeimg.pl/300x500"
  },
  {
    imageUrl: "https://fakeimg.pl/300x500"
  },
  {
    imageUrl: "https://fakeimg.pl/200x350"
  },
  {
    imageUrl: "https://fakeimg.pl/200x350"
  }
];

items.forEach(item => {
  db.query(sql, [item.imageUrl, userId, postId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('inserted');
    }
  });
});
