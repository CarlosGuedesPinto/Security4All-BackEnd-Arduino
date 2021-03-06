const bcrypt = require("bcryptjs");
const authModel = require("../../models/sql/auth.model");
const userModel = require('../../models/sql/user.model');
const jwt = require('../../assets/scripts/jwt');


const authCtrl = {
    login(req, res, next) {
        try {
            authModel.login(req.body, (err, user) => {
                if (err) {
                    next(err);
                    return;
                }
                console.log(user)
                if (user.length == 0) {
                    next({ error: "Não foi encontrado o user" })
                }
                user = user[0]
                req.idUser = user.idUser
                if (user == undefined) {
                    next({ error: "Esse email Ao existe", email: req.body.email })
                    return;
                }
                console.log(user)
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.createAccessToken(req);
                    console.log(token);
                    res.cookie('token', token, {
                        // httpOnly: true
                        maxAge: 999999
                    })
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Access-Token");
                    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                    res.set('x-access-token', token)
                    res.json({ success: true, data: user, token: token });
                } else {
                    res.json({ success: false, msg: "as passwords não correspondem" })
                }
            });
        } catch (error) {
            console.log(error, "kakakakalakalakalakalak")
            next(error);
            return;
        }
    },
    register(req, res, next) {
        try {
            userModel.insert(req.body, (err, data) => {
                if (err) {
                    next(err);
                    return;
                }

                res.json({ success: true, data: data })
            })
        } catch (error) {
            next(error);
            return;
        }
    }
}

module.exports = authCtrl;