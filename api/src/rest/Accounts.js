const express = require("express");

const router = express.Router();

const data = [{
    username: "Max Mustermann",
    email: "max.mustermann@firma.de",
    role: "user",
    last_changed: "2020-12-14T13:16:36.080",
    created_at: "2020-12-13T13:16:36.080",
    last_login: "2020-12-15T13:16:36.080",
}, {
    username: "Jens Jensen",
    email: "jens.jensen@selskab.dk",
    role: "mod",
    last_changed: "2020-12-14T13:16:36.080",
    created_at: "2020-12-13T13:16:36.080",
    last_login: "2020-12-15T13:16:36.080",
}];

router.get('/', function (req, res) {
    res.json(data)
});
router.get('/:user', function (req, res) {
    res.send(data[req.params.user])
});

module.exports = router;