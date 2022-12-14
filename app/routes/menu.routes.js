module.exports = app => {
    const menus = require('../controllers/menu.controller');

    var router = require('express').Router();

    router.post("/", menus.create);

    router.get("/", menus.findAll);

    router.get("/:id", menus.findOne);

    router.put("/:id", menus.update);

    router.delete("/:id", menus.delete);

    app.use('/menu', router);
}