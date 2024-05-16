const express = require('express')
const router = express.Router()
const db = require ('../db');
const setCurrentUser = require('../middlewares/set_current_user');
const ensureLoggedIn = require('../middlewares/ensureLoggedIn')



router.post('/comments', ensureLoggedIn, (req, res) => {
    const content = req.body.content
    const postId = req.body.post_id


    const sql = `
    INSERT INTO
    comments
    (content, post_id, user_id)
    VALUES
    ($1, $2, $3);
    `
    

    db.query(sql, [content, postId, req.session.userId], (err, result) => {
        if (err) console.log(err);

        
        res.redirect(`/posts/${postId}`)
    })
})

module.exports = router

