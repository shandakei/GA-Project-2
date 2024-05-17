ComiCan

This is the 2nd project of the course after being introduced to SQL. As a first attempt at CRUD webapps, including MVPs and beyond was a challenge and a half.  

For this CRUD app, I decided to create a site where users can upload their own works into posts with a focus on fan art, comics, manga, doujinshi etc. 

Upon clicking on the title of a post that seems interesting, a details page of the post that can include multiple files/images will be met and can also be viewed as original source images.

---------------------------------------------------------------------------------------------------------------------------------------------------------

Click the link below to check it out:

[]


---------------------------------------------------------------------------------------------------------------------------------------------------------

ABOUT

Once a user has been inserted into the database, they can freely add, edit, delete and favourite posts as they see fit. There are no limitations on the amount that can be uploaded or restrictions on file size (Of course keep in mind that larger uploads will take more time to sync up)

Feel free to be an active poster or an active reader and share what you think in our opst comment sections.


<img src="/media/Screenshot 2024-05-16 195757.png">
<img src="/media/Screenshot 2024-05-17 005719.png">
<img src="/media/Screenshot 2024-05-17 102354.png">
<img src="/media/Screenshot 2024-05-17 102406.png">
<img src="/media/Screenshot 2024-05-17 102459.png">

---------------------------------------------------------------------------------------------------------------------------------------------------------

COMMITS

1st commit - css basics finished, minor (styling&path) bugs

2nd commit - functionality finished, onto styling

3rd commit - no errors, multiple images display correctly

4th commit - cloudify/multer implemented, user_id error fixed

5th commit - user errors fixed, implementing multer+cloud for new files paths in routers

6th commit - CRUD almost finished, working edit/img submission

7th commit - README

8th commit - final#1


MISCELLANEOUS:

<img src="/media/Screenshot 2024-05-17 105244.png">
<img src="/media/Screenshot 2024-05-17 105150.png">


Languages: HTML, CSS, JS, SQL

MODULES: 
express, 
ejs, 
express-ejs-layouts,
method-override, 
pg, nodemon, 
express-session, 
bcrypt, 
dotenv, 
middlewares, 
postgres, 
multer, 
cloudinary

SITES:

- trello.com
- render.com
- cloudify.com
- ezgif.com
- imgur.com
- DALL-E



ERRORS - RESOLVED:

- post router inserting user_id
- log in consistency
- FK error
- Incorrect MODULE version multer -> cloudify
- GET fails for files
- table format + column errors
- submissions not inserting to able
- Favourites list - postId column error


Final Comments:

There is a huge difference working front-end and working full-stack solo. Here's an analogy:

Working front-end is like throwing a ball at a bumpy wall and having to catch it one-handed.

Working full-stack is like throwing a ball at a bumpy wall, then it has to hit 6 other walls in the right place, then catching it one handed with your off-hand.

As usual, planning ahead is key. Without a flow diagram and trello dashboard to keep track of my progress, this project would have taken twice as long.

Either, do not make your code more complicated when working with servers and databases when debugging an error OR handle errors at every 1 or 2 new lines of code.