const user = require("../models/user");
const User = require("../models/user")
const {check, validationResult} = require("express-validator")
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


exports.signin = (req, res)=>{
    const {email, password} = req.body;

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}, (err, user)=>{
        if(err){
            return res.status(400).json({
                error: "User email doesn't exists"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id:user._id}, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, {expire: new Date()+9999});
        //send response to front end
        const {_id, name, email, role} = user;
        return res.json({token, user:{_id, name, email, role}})
    })


}

exports.signup = (req, res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) =>{
        if(err){
            return res.status(400).json({
                error:"Unable to save user"
            })
        }

        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        });
    })
}

exports.signout = (req, res)=>{
    //bearer is a person which takes a token
    res.clearCookie("token");
    res.json({
        message:"User signout successfully"
    })
}

//protected routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});

exports.isAuthenticated = (req, res, next) =>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"Access Denied"
        })
    }

    next();
}

exports.isAdmin = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile.role == 1;
    if(!checker){
        return res.status(403).json({
            error:"User is not an Admin"
        })
    }

    next()
}
