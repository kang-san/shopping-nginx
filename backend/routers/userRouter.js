const express = require('express');
const {sellersCtrl, userDummyCtrl, userSigninCtrl,userRegisterCtrl,
    userDetailCtrl, userProfileUpdateCtrl, usersCtrl, userDelete, userUpdateCtrl}
= require("../controllers/userCtrl.js")
const userRouter = express.Router()
const { generateToken, isAdmin, isAuth } = require('../utils.js') ;

userRouter.get('/top-sellers', sellersCtrl);

userRouter.get('/seed', userDummyCtrl);

userRouter.post('/signin', userSigninCtrl);

userRouter.post('/register', userRegisterCtrl);

userRouter.get( '/:id', userDetailCtrl);

userRouter.put( '/profile', userProfileUpdateCtrl);

userRouter.get('/', isAuth, isAdmin, usersCtrl)

userRouter.delete( '/:id', isAuth, isAdmin, userDelete);

userRouter.put('/:id', isAuth, isAdmin, userUpdateCtrl);

module.exports= userRouter;