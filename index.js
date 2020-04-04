const app = require('./server');

const {
    PORT,
    APP_NAME
} = require("./config");

//starting server

app.listen(PORT, function () {
    console.log(`${APP_NAME} has started on port ${PORT}`);
});