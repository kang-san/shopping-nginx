const express = require('express');
const {userDummyCtrl, userSigninCtrl,userRegisterCtrl,  userDetailCtrl, userProfileUpdateCtrl}
= require("../controllers/userCtrl.js")
const userRouter = express.Router();

userRouter.get('/seed', userDummyCtrl);

userRouter.post('/signin', userSigninCtrl);

userRouter.post('/register', userRegisterCtrl);

userRouter.get( '/:id', userDetailCtrl);

userRouter.put( '/profile', userProfileUpdateCtrl);


module.exports= userRouter;