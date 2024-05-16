const express = require('express')
const router = express.Router()
const db = require ('../db');
// const setCurrentUser = require('../middlewares/set_current_user');


router.get('/', (req, res) => {
    console.log(req.session.userId);


    db.query('SELECT * FROM posts;', (err, result) => {
        if (err) {
            console.log(err);
        }
        const posts = result.rows
        

        res.render('home', { posts : posts })
    })
})

module.exports = router