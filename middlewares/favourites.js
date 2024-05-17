const express = require('express');
const router = express.Router();
const db = require('../db');
const setCurrentUser = require('./set_current_user');
const ensureLoggedIn = require('./ensureLoggedIn');

router.post('/favourites', (req, res) => {
    const userId = req.session.userId;
    const postId = req.body.post_id;
    const title = req.body.title || ''

    console.log(userId);
    console.log(postId);
    console.log(title);

    const checkSql = `
        SELECT * FROM favourites WHERE user_id = $1 AND post_id = $2;
    `;

    db.query(checkSql, [userId, postId], (err, result) => {
        if (err) {
            console.log(err);
        }

        if (result.rows.length > 0) {
            return res.redirect('/profile');
        }

        const insertSql = `
            INSERT INTO favourites (user_id, title, post_id)
            VALUES ($1, $2, $3);
        `;

        db.query(insertSql, [userId, title, postId], (err, result) => {
            if (err) {
                console.log(err);
            }

            res.redirect('/profile');
        });
    });
});

router.get('/profile', (req, res) => {
    const userId = req.session.userId;

    let sql = `
    SELECT favourites.title, images.file_path
    FROM favourites
    JOIN posts ON favourites.post_id = posts.id
    JOIN images ON posts.id = images.post_id
    WHERE favourites.user_id = $1;`
    

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error(err);
        }

        const favourites = result.rows;
        console.log(favourites);

        res.render('profile', { favourites: favourites });
    });
});

module.exports = router;
