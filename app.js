require('dotenv').config();

const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const categoryRouter = require('./routes/categoryRoutes');
const indexRouter = require('./routes/indexRoutes');
const itemRouter = require('./routes/itemRoutes');
const authRouter = require('./auth/routes/authRouter');

const passportAuth = require('./auth/controllers/authenticate.js');
const app = express();

app.set('view engine', 'ejs');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

// passport middlewares for authentication
passport.use(new LocalStrategy(passportAuth.checkUserPassword));
passport.serializeUser(passportAuth.serializeUser);
passport.deserializeUser(passportAuth.deserializeUser);

app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/item', itemRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
