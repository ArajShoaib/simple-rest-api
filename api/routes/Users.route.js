const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', (req, res) => {
    controllers.Users.getUsers(req, res);
})

router.post('/', (req, res) => {
    controllers.Users.addUser(req, res);
})

module.exports = router;