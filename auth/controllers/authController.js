require('dotenv').config();

const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

exports.renderSignUp = (req, res) => {
  res.render('signUpForm');
};

exports.signUpPost = async (req, res) => {
  const { username, password } = req.body;
  try {
    await sql(
      `INSERT INTO users(username,password) VALUES('${username}','${password}')`
    );
    res.redirect('/category/');
  } catch (err) {
    console.log(`[DATABASE ERROR] ${err}`);
  }
};

exports.loginRender = (req, res) => {
  res.render('login.ejs');
};
