const data = require('../data.js');
const bcrypt = require('bcryptjs');
const User = require("../models/userModels.js");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../utils.js");


const userDummyCtrl = expressAsyncHandler(async(req, res)=>{

    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
});

const userSigninCtrl = expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({email: req.body.email});

    if(user){

        if(bcrypt.compareSync(req.body.password, user.password)){

            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }

    }
    res.status(401).send({message: 'Invalid email or password' });
})

const userRegisterCtrl =  expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    const createUser = await user.save();
    res.send({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        isAdmin: createUser.isAdmin,
        token: generateToken(createUser),
    })
});

const userDetailCtrl = expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if(user){
            res.send(user);
        }else{
            res.status(404).send({message: 'User Not Found'});
        }
    }
);

const userProfileUpdateCtrl = expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if(user){
            // 데이터 업데이트
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8)
            }
            const updateUser = await user.save();
            res.send({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser),
            })
        }
});


module.exports= {userDummyCtrl, userRegisterCtrl, userSigninCtrl, userDetailCtrl, userProfileUpdateCtrl};