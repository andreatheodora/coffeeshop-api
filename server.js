const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cookieSession({
        name: "my-session",
        secret: "COOKIE_SECRET",
        httpOnly: true
    })
);

const db = require('./app/models');
const Role = db.role;

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to database! :)");
    })
    .catch(err => {
        console.log("Cannot connect to database :(");
        process.exit();
    });

require("./app/routes/menu.routes")(app);
require("./app/routes/ingredient.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Server is listening at port ${PORT}`)
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                name: "customer"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'customer' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    })
}

initial();