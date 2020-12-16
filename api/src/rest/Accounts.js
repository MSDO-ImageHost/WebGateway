const express = require("express");

const router = express.Router();

const data = [{
    username: "Max Mustermann",
    email: "max.mustermann@firma.de",
    role: "0",
    last_changed: "2020-12-14T13:16:36.080",
    created_at: "2020-12-13T13:16:36.080",
    last_login: "2020-12-15T13:16:36.080",
}, {
    username: "Jens Jensen",
    email: "jens.jensen@selskab.dk",
    role: "10",
    last_changed: "2020-12-14T13:16:36.080",
    created_at: "2020-12-13T13:16:36.080",
    last_login: "2020-12-15T13:16:36.080",
}, {
    username: "John Bull",
    email: "john.bull@company.co.uk",
    role: "20",
    last_changed: "2020-12-14T13:16:36.080",
    created_at: "2020-12-13T13:16:36.080",
    last_login: "2020-12-15T13:16:36.080",
}];

router.get('/', function (req, res) {
    res.json(data)
});
router.get('/user/:id', function (req, res) {
    //RequestAccountData
    res.send(data[req.params.user])
});
router.put('/user/:id', function (req, res) {
    //UpdateAccount
});
router.delete('/user/:id', function (req, res) {
    //RequestAccountDelete
});
router.put('/user/admin/ban', function (req, res) {
    //RequestBanUser
});
router.put('/user/admin/flag', function (req, res) {
    //RequestFlagUser
});
router.get('/user/admin/flag', function (req, res) {
    //RequestAllFlagged
});

module.exports = router;