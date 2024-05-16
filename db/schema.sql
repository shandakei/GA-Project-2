CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    user_name TEXT UNIQUE,
    password_digest TEXT
);

    INSERT INTO users (email, user_name, password_digest) VALUES ('user@ga.com', 'AKK', 'pw');

    |------------------------|

    CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(200), 
    description TEXT,
    user_id INTEGER --fk?
);

INSERT INTO posts (title, description, image_url) VALUES ('test', 'lorem lorem lorem', 'https://fakeimg.pl/600x400');

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE  
);

--alter comment table later
    --FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    --FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE  

    CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    image_url TEXT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE  
);


ALTER TABLE images
ADD COLUMN file_path TEXT;



CREATE TABLE favourites (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    title VARCHAR(200),
    FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE 
);

-- let sql = `
--         SELECT posts.id, posts.title
--         FROM favourites
--         JOIN posts ON favourites.post_id = posts.id
--         WHERE favourites.user_id = $1;
--     `;
--  let sql = `
--         INSERT INTO favourites (user_id, post_id)
--         VALUES ($1, $2)
--         RETURNING id;  
--     `



-- let sql = `SELECT posts.title, posts.id as post_id
--                FROM favourites 
--                JOIN posts ON favourites.post_id = posts.id 
--                WHERE favourites.user_id = $1`;


ALTER TABLE favourites ADD COLUMN user_id INTEGER;
ALTER TABLE favourites ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

UPDATE users SET user_name = 'Alexander' WHERE id = 1;
