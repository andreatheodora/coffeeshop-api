const dbConfig = require('../db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.menus = require('./menu.model')(mongoose);
db.ingredients = require('./ingredient.model')(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["admin", "customer"];

module.exports = db;