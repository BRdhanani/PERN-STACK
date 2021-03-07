const express = require("express");
const router = express.Router();
const pool = require("./db");

const prefix = `/api`;

router.get(`${prefix}/get/posts`, (req, res, next) => {
  pool.query(
    "SELECT * FROM posts ORDER BY date_created DESC",
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.post(`${prefix}/addpost`, (req, res, next) => {
  const { title, body, uid, username } = req.body;
  const values = [title, body, uid, username];
  pool.query(
    `INSERT INTO posts(title, body, user_id, author, date_created) VALUES($1, $2, $3, $4, NOW())`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.put(`${prefix}/put/post`, (req, res, next) => {
  const { title, body, uid, pid, username } = req.body;
  const values = [title, body, uid, pid, username];
  pool.query(
    `UPDATE posts SET title= $1, body= $2, user_id = $3, author = $5, date_created=NOW() WHERE pid = $4`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.delete(`${prefix}/delete/comments`, (req, res, next) => {
  const post_id = req.body.post_id;
  pool.query(
    `DELETE from comments WHERE post_id = $1`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.delete(`${prefix}/delete/post`, (req, res, next) => {
  const post_id = req.body.post_id;
  pool.query(`DELETE from posts WHERE pid = $1`, [post_id], (q_err, q_res) => {
    res.json(q_res.rows);
  });
});

router.post(`${prefix}/addcomment`, (req, res, next) => {
  const { comment, user_id, username, post_id } = req.body;
  const values = [comment, user_id, username, post_id];
  pool.query(
    `INSERT INTO comments(comment, user_id, author, post_id, date_created) VALUES($1, $2, $3, $4, NOW())`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.put(`${prefix}/put/comment`, (req, res, next) => {
  const { comment, user_id, post_id, username, cid } = req.body;
  const values = [comment, user_id, post_id, username, cid];
  pool.query(
    `UPDATE comments SET comment= $1, user_id= $2, post_id = $3, author = $4, date_created=NOW() WHERE cid = $5`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.delete(`${prefix}/delete/comment`, (req, res, next) => {
  const cid = req.body.cid;
  pool.query(`DELETE from comments WHERE cid = $1`, [cid], (q_err, q_res) => {
    res.json(q_res.rows);
  });
});

router.get(`${prefix}/get/comments`, (req, res, next) => {
  const post_id = req.query.post_id.toString();
  pool.query(
    `SELECT * FROM comments WHERE post_id = $1`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.post(`${prefix}/adduser`, (req, res, next) => {
  const { nickname, email, email_verified } = req.body;
  const values = [nickname, email, email_verified];
  pool.query(
    `INSERT INTO users(username, email, email_verified, date_created) VALUES($1, $2, $3, NOW()) ON CONFLICT DO NOTHING`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.get(`${prefix}/get/user`, (req, res, next) => {
  const { email } = req.body;
  pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});

router.get(`${prefix}/get/userposts`, (req, res, next) => {
  const { user_id } = req.body;
  pool.query(
    `SELECT * FROM posts WHERE user_is = $1`,
    [user_id],
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      res.json(q_res.rows);
    }
  );
});
module.exports = router;
