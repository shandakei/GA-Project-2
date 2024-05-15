const express = require('express')
const router = express.Router()
const db = require ('../db');
const setCurrentUser = require('../middlewares/set_current_user');
const upload = require('../middlewares/upload')


router.get('/images', (req, res) => {


    let sql = `
    SELECT * FROM images;
    `


    db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.redirect(result.rows)

    })
})


router.get('/posts/:postId/images', (req, res) => {
   
    const sql = `
    SELECT * FROM images
    WHERE
    post_id = $1;
    `
    db.query(sql, [req.params.postId], (err, result) => {
        if (err) console.log(err);
        
        res.redirect(`/posts/${req.params.postId}`)
    })
})


router.post('/posts/:postId/images', upload.single('upload_file'),(req, res) => { 
    const { image_url } = req.file.path
    const path = req.file.path //becomes req.file
    const userId = req.session.userId
    const postId = req.params.postId;

    const sql = `
    INSERT INTO images (image_url, file_path, user_id, post_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *; 
    `
    console.log('userId =',userId);
    console.log(sql, 'sql test line 52');
    db.query(sql, [image_url, path, userId, postId], (err, result) => {
        if (err) console.log(err);
        
        console.log('image inserted', result.rows[0]);

        res.redirect(`/posts/${postId}`)
    })
})



module.exports = router
