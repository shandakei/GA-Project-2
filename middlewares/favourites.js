const express = require('express')
const router = express.Router()
const db = require ('../db');
const setCurrentUser = require('./set_current_user');
const ensureLoggedIn = require('./ensureLoggedIn')


router.post('/favourites', (req, res) => {

    const userId = req.session.userId

    const title = req.body.title;
    const postId = req.body.postId;

    let sql = `
        INSERT INTO favourites (user_id, title, post_id)
        VALUES ($1, $2, $3);  
    `

    db.query(sql, [userId, title, postId], (err, result) => {
        if (err) console.log(err);


        res.redirect(`/profile`)

    })
})


router.get('/profile', (req, res) => {
    const userId = req.session.userId;

    let sql = `
    SELECT favourites.title, images.file_path
    FROM favourites
    JOIN posts ON favourites.post_id = posts.id
    LEFT JOIN images ON posts.id = images.post_id
    WHERE favourites.user_id = $1;`

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error(err);
            
        }

        const favourites = result.rows;
        console.log(favourites);

        res.render('profile', { favourites: favourites })
    })
})


module.exports = router