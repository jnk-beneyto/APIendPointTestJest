const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require("express");
const app = express();
const {
    DB_DEV
} = require("./config");
const {
    UserRoutes
} = require("./routes");


//middlewares

app.use(express.json());
app.use(helmet());
app.use(cors());

mongoose.Promise = global.Promise;

//Welcoming route

app.get('/', function (req, res) {
    res.send({
        status: 200,
        message: "Welcome aboard!"
    });
    res.end();
});


//routing

app.use('/user', UserRoutes);


//uknown url 

app.get('*', function (req, res) {
    res.send({
        status: 404,
        message: "Not found!"
    });
    res.end();
});

//db conection

mongoose.connect(DB_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(
    err => console.log("error " + err.message)
);

module.exports = app;