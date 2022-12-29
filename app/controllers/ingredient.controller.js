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
        price: req.body.price,
        imageUrl: req.body.imageUrl
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

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: {$regex: new RegExp(name), $options: "i"}} : {};

    Ingredient.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Ingredients."
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Ingredient.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Ingredient with id "+id+" not found."})
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving ingredient with id " + id});
        });
}

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;

    Ingredient.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({ message: "Cannot update ingredient with id "+id});
            } else res.send({ message: "Successfully updated ingredient"});
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating ingredient with id "+id});
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Ingredient.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete Ingredient with id ${id}`
                });
            } else {
                res.send({
                    message: "Ingredient with id " + id + " was deleted successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ingredient with id " + id
            });
        });
}
