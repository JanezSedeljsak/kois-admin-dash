const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("./../models/User");

exports.loginUser = (req, res, next) => {
    let getUser;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            getUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }
    }).then(response => {
        if (!response) {
            return res.status(406).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "kois-scv-js-spp", {
            expiresIn: "2h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 7200,
            msg: getUser
        });
    }).catch(err => {
        return res.status(406).json({
            message: "Authentication failed"
        });
    });
}

exports.createUser = (req, res, next) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        const user = new userSchema({
            name,
            email,
            password: hash
        });
        user.save().then((response) => {
            res.status(200).json({
                message: "User successfully created!",
                result: response
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });
}

exports.getAllUsers = (req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
}

exports.getUser = (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                ...data
            })
        }
    })
}

exports.updateUser = (req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
}

exports.deleteUser = (req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
}