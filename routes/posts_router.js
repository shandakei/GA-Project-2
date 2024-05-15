const express = require('express')
const db = require('../db/index.js')  
const ensureLoggedIn = require('../middlewares/ensureLoggedIn.js')
const router = express.Router()


router.get('/posts/:id', (req, res) => {
   
    const sql = `
    SELECT * FROM posts WHERE id = $1
    `

    const commentsSQL = `
    SELECT * FROM comments
    JOIN users
    ON (comments.user_id = users.id) 
    WHERE post_id = $1;
    `

    const imagesSQL = `
    SELECT * FROM images
    JOIN users
    ON (images.user_id = users.id)
    WHERE post_id = $1
    `
    console.log('reached line 26 postrouter');
    db.query(sql, [req.params.id], (err, result) => {
            if (err) {
                console.log(err);
            }
                const post = result.rows[0]
                console.log('line 32, posts router');

            db.query(imagesSQL, [req.params.id], (err, imgResult) => {
                if (err) {
                    console.log(err);
                }

                const images = imgResult.rows
                console.log(images);

                db.query(commentsSQL, [req.params.id], (err, result) =>{
                    if (err) {
                        console.log(err);
                    }
                    const comments = result.rows
                    
                    
                    res.render('details', { post : post, comments : comments, images: images })
                })
         })
    })
})


router.get('/share', ensureLoggedIn, (req, res) => {
    res.render('share')
})


router.post('/posts', ensureLoggedIn, (req, res) => {
    console.log(req.body);

    const title = req.body.title
 
    const description = req.body.description

    const userId = req.session.userId

    const sql = `INSERT INTO posts   
    (title, description, user_id)
    VALUES 
    ($1, $2, $3)
    ;`


    db.query(sql, [title, description, userId], (err, result) => {
        if (err) {
            console.log(err);
        }

        res.redirect('/')
    })
   
})

router.delete('/posts/:id', (req, res) => {

    let sql = `DELETE FROM posts WHERE id = $1; `

    

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }

    res.redirect('/')
    })
})

router.get("/posts/:id/edit", (req, res) => {

    let sql = `
    SELECT * FROM posts WHERE id = $1;
    `

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }

        const post = result.rows[0]


        res.render('edit', {post : post} );
    })  

})

router.put('/posts/:id', (req, res) => {
 
    const title = req.body.title
    const description = req.body. description
    const postId = req.params.id

    const sql = `
    UPDATE posts 
    SET 
        title = $1, 
        description = $2
    WHERE
        id = $3;
    `

    db.query(sql, [title, description, postId], (err, result) => {
        if (err) {
            console.log(err);
        }

        res.redirect(`/posts/${postId}`)
    })
})


module.exports = router