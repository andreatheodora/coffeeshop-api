const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/test/all", controller.allAccess);

    app.get("/test/admin", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard);

    app.get("/test/customer",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.customerBoard
    );
};