const express = require("express");
const cors = require("cors");
// routes
const routes = require("../routes");

const app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "build");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/users", routes.Users);

app.get('/', (req, res) => {
    return res.status(200).send({ success: true, message: 'Server is running fine!' })
})

module.exports = app;