const express = require('express')
const router = express.Router()
const db = require ('../db');
const setCurrentUser = require('../middlewares/set_current_user');


router.get('/images', (req, res) => {


    let sql = `
    SELECT * FROM images
    VALUES
    ($1);
    `
    const image = req.body.image_url

    db.query(sql, [image], (err, result) => {
        if (err) console.log(err);

    })
})

// app.get('/images/:id', (req, res) => {
//     if (err) console.log(err);

//     let sql = `
//     SELECT * FROM images
//     VALUES
//     ($1);
//     `
//     const image = req.body.image_url

//     db.query(sql, [image], (err, result) => {
//         if (err) console.log(err);

//     })
// })

router.post('/posts/:postId/images', (req, res) => {
    const image = req.body.image_url
    const userId = req.session.user_id
    const postId = req.body.post_id


    // const sql = `
    // INSERT INTO
    // images
    // (image_url, post_id, user_id)
    // VALUES
    // ($1, $2, $3);
    // `
    const sql = `
    SELECT * FROM images
    WHERE
    post_id = $1;
    `
    db.query(sql, [req.params.postId], (err, result) => {
        if (err) console.log(err);

    // db.query(sql, [image, postId, userId], (err, result) => {
    //     if (err) console.log(err);

        
        res.redirect(/posts/`${id}`)
    })
})

module.exports = router
