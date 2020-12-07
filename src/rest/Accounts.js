const express = require("express");

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', function (req, res) {
    res.send('All accounts');
});
router.post('/:user', function (req, res) {
    res.send('Account data of' + req.params["user"]);
});

module.exports = router;