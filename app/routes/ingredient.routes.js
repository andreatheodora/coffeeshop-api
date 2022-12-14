module.exports = app => {
    const ingredients = require('../controllers/ingredient.controller');

    var router = require('express').Router();

    router.post('/',ingredients.create);

    router.get("/:category", ingredients.findByCategory);

    app.use('/ingredients', router);

}