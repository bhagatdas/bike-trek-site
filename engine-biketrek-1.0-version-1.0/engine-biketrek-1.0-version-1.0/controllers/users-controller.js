const uuid = require('uuid').v4;
const {validationResult} = require('express-validator');
const HttpError = require('../exceptions/http-error');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const login = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new HttpError('Invalid input, please check your data', 422);
    }
    const {
        googleId,
        name,
        photo,
        email,
        lastLogin
    } = req.body;

    const addUser = new User({
        googleId,
        name,
        photo,
        email,
        lastLogin: new Date().toISOString()
    });
    
    try {
        await addUser.save();
    } catch (err) {
        const error = new HttpError(err, 500);
        return next(error);
    }

    let token;
    try{
        token = jwt.sign({userId : addUser.id , email : addUser.email}, 'foxlife@9887' , {expiresIn:'1h'});
    }catch(err){
        const error = new HttpError('Signing failed , please try again. ', 500);
        return next(error);
    }
    
    res.status(201).json({
        userId: addUser.id,
        email :addUser.email,
        token :token
    });
};

exports.login = login;