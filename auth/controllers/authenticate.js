require('dotenv').config();

const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

exports.checkUserPassword = async (username, password, done) => {
  try {
    const rows = await sql(`SELECT * FROM users WHERE username='${username}'`);
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

exports.serializeUser = (user, done) => {
  done(null, user.id);
};

exports.deserializeUser = async (id, done) => {
  try {
    const rows = await sql(`SELECT * FROM users WHERE id=${id}`);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
};
