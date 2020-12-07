const express = require("express");

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', function (req, res) {
    res.send('Logged in as:');
});
router.post('/:user', function (req, res) {
    res.send('Login attempt as user' + req.params["user"]);
});

module.exports = router;