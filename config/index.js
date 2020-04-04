if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    APP_NAME: process.env.APP_NAME,
    DB_DEV: process.env.DB_DEV,
    TEST_DB_DEV: process.env.TEST_DB_DEV,
    TEST_COLLECTION: process.env.TEST_COLLECTION,
    OTHER_NAME: process.env.OTHER_NAME
}