const { Router } = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');
const authRouter = Router();

authRouter.get('/signup', authController.renderSignUp);
authRouter.post('/signup', authController.signUpPost);
authRouter.get('/log-in', authController.loginRender);
authRouter.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/category',
    failureRedirect: '/',
  })
);

module.exports = authRouter;
