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
router.post('/', function (req, res) {
    //RequestAccountCreate
});
router.get('/:id', function (req, res) {
    //RequestAccountData
    res.send(data[req.params.user])
});
router.put('/:id', function (req, res) {
    //UpdateAccount
});
router.delete('/:id', function (req, res) {
    //RequestAccountDelete
});
router.put('/admin/ban', function (req, res) {
    //RequestBanUser
});
router.put('/admin/flag', function (req, res) {
    //RequestFlagUser
});
router.get('/admin/flag', function (req, res) {
    //RequestAllFlagged
});
router.get('/:id/posts', function (req, res) {
    //Get the posts a user have created
    res.status(200).send();
});

module.exports = router;