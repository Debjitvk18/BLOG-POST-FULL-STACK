import pool from "../config/db.js";

export const createTablePosts = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

export const getAllPosts = async () => {
  const { rows } = await pool.query(
    `SELECT posts.*, users.username 
     FROM posts 
     JOIN users ON posts.user_id = users.id
     ORDER BY posts.created_at DESC`
  );
  return rows;
};

export const getPostById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return rows[0];
};

export const createPost = async (user_id, title, content, image) => {
  const { rows } = await pool.query(
    "INSERT INTO posts (user_id, title, content, image) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, title, content, image]
  );
  return rows[0];
};

export const updatePost = async (id, title, content, image) => {
  const { rows } = await pool.query(
    "UPDATE posts SET title=$1, content=$2, image=$3 WHERE id=$4 RETURNING *",
    [title, content, image, id]
  );
  return rows[0];
};

export const deletePost = async (id) => {
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
  return true;
};
