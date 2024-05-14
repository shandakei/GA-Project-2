require('dotenv').config() 

const bcrypt = require('bcrypt') 
const db = require('./index.js')

const email = 'user@ga.com'
const userName = 'AKK'
const plainTextPassword = 'pw'
const saltRounds = 10;
const sql = `INSERT INTO
 users 
 (email, user_name, password_digest) 
 VALUES  
 ($1, $2, $3)
 RETURNING
 *;`

bcrypt.genSalt(saltRounds,  (err, salt) => {

    bcrypt.hash(plainTextPassword, salt, (err, hash) => {

        db.query(sql, [email, userName, hash], (err, result) => {
            if (err) {
                console.log(err);
            }
          
            console.log(result.rows[0]);

        })
    })
})