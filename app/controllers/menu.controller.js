const db = require('../models');
const Menu = db.menus;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Name cannot be empty"
        });
        return;
    }

    const menu = new Menu({
        name: req.body.name,
        description: req.body.description,
        baseIngredients: req.body.baseIngredients,
        optionalIngredients: req.body.optionalIngredients ?? [],
        basePrice: req.body.basePrice,
        imageUrl: req.body.imageUrl
    });

    menu
        .save(menu)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error in creating menu."
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: {$regex: new RegExp(name), $options: "i"}} : {};

    Menu.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Menu."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Menu.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Menu with id "+id+" not found."})
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving menu with id " + id});
        });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;

    Menu.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({ message: "Cannot update menu with id "+id});
            } else res.send({ message: "Successfully updated menu"});
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating menu with id "+id});
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Menu.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete menu with id ${id}`
                });
            } else {
                res.send({
                    message: "Menu with id " + id + " was deleted successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete menu with id " + id
            });
        });
};
