const pg = require('pg') 


const connectionString = process.env.DATABASE_URL 

const db = new pg.Pool({   
   connectionString: connectionString,
   
   ssl: {
      rejectUnauthorized: false
   }
}) 

module.exports = db