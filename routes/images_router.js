const express = require('express')
const router = express.Router()
const db = require ('../db');
const setCurrentUser = require('../middlewares/set_current_user');



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


router.post('/posts/:postId/images', (req, res) => { //removed images from path
    const { image_url } = req.body
    const userId = req.session.userId
    const postId = req.params.postId;

    const sql = `
    INSERT INTO images (image_url, user_id, post_id)
    VALUES ($1, $2, $3)
    RETURNING *; 
    `
    console.log(userId);
    db.query(sql, [image_url, userId, postId], (err, result) => {
        if (err) console.log(err);
        
        console.log('image inserted', result.rows[0]);

        res.redirect(`/posts/${postId}`)
    })
})

//no form that calls this route

module.exports = router
