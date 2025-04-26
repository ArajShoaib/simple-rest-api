require('dotenv').config();

module.exports = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo: {
        uri: process.env.MONGO_BD_URI,
    }
}