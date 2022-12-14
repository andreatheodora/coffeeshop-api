const jwt = require("jsonwebtoken");
const config = require("../auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if(!token) {
        return res.status(403).send({ message: "No token provided"});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!"});
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err});
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Requires Admin privileged"});
                return;
            }
        );
    });
};

isCustomer = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i=0; i < roles.length; i++) {
                    if(roles[i].name === "customer") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Not a customer!"});
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isCustomer
};

module.exports = authJwt;