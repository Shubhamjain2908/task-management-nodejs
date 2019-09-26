'use strict';

const passport = require('passport');
require('../middleware/passport')(passport);
const express = require('express');
const router = express.Router();

const Auth = require('../controllers/AuthController');
const Task = require('../controllers/TaskController');

/***********************
  Auth Routes
***********************/
router.post('/signup', Auth.signUp);
router.post('/login', Auth.login);
router.post('/change_password', passport.authenticate('jwt', { session: false }), Auth.changePassword);
router.get('/logout', passport.authenticate('jwt', { session: false }), Auth.logout);
/***********************
  Auth Routes
***********************/

/***********************
  Task Routes
***********************/
router.post('/tasks', passport.authenticate('jwt', { session: false }), Task.createTask);
router.get('/tasks', passport.authenticate('jwt', { session: false }), Task.fetchTasks);
router.put('/task/:id', passport.authenticate('jwt', { session: false }), Task.updateTask);
router.patch('/task/:id/status', passport.authenticate('jwt', { session: false }), Task.updateStatus);
router.delete('/task/:id', passport.authenticate('jwt', { session: false }), Task.deleteTask);
/***********************
  Task Routes
***********************/

module.exports = router;
