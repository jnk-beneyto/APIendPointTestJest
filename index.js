const helmet = require('helmet');
const cors = require('cors');
const {
    PORT
} = require("./config");
const express = require("express");
const app = express();

//middlewares

app.use(express.json());
app.use(helmet());
app.use(cors());

//routes

app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: "Welcome aboard"
    });
    res.end();
})

app.listen(process.env.PORT, function () {
    console.log(`express has started on port ${process.env.PORT}`);
});