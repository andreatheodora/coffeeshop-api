const db = require('../models');
const Ingredient = db.ingredients;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Name cannot be empty"
        });
        return;
    }

    const ingredient = new Ingredient({
        name: req.body.name,
        category: req.body.category ?? '',
        stock: req.body.stock,
        price: req.body.price
    });

    ingredient
        .save(ingredient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error in creating ingredient."
            });
        });

};

exports.findByCategory = (req, res) => {
    const category = req.params.category;

    Ingredient.find({ category: category })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error while fetching category: "+category
            });
        });
};

