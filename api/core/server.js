const mongoose = require('mongoose');
const app = require('./app');
const { environment, port, mongo } = require('../config/vars');

mongoose.set('strictQuery', true);
mongoose.connect(mongo?.uri);
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error: "));
connection.once("open", () => {
    console.log("DB connected successfully");
});

app.listen(port, () => {
    console.log(`Server is running in ${environment} environment on PORT = ${port}`);
})