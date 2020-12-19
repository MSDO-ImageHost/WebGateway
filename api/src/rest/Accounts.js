const express = require("express");
const router = express.Router();
const {validJWT, maybeJWT} = require("../jwtAuth");

const {JWT_ENCODE, JWT_DECODE} = require("../mocking_data");


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

router.get('/', maybeJWT, function (req, res) {
    res.json(data)
});


// RequestAccountCreate
router.post('/', function (req, res) {
    // Request body contains this: `{username:<String>, email:<String>, password:<String>}`

    // {"sub":"5","role":"user","iss":"ImageHost.sdu.dk","exp":1638560713,"iat":1607024713}
    const token = JWT_ENCODE({sub: req.body.userid, role: 1, iss: "ImageHost.sdu.dk"});
    res.status(201).json({token});
});

router.get('/:id', maybeJWT, function (req, res) {
    //RequestAccountData
    res.send(data[req.params.user])
});
router.put('/:id', validJWT, function (req, res) {
    //UpdateAccount
});
router.delete('/:id', validJWT, function (req, res) {
    //RequestAccountDelete
});
router.put('/admin/ban', validJWT, function (req, res) {
    //RequestBanUser
});
router.put('/admin/flag', validJWT, function (req, res) {
    //RequestFlagUser
});
router.get('/admin/flag', validJWT, function (req, res) {
    //RequestAllFlagged
});
router.get('/:id/posts', maybeJWT, function (req, res) {
    //Get the posts a user have created
    res.status(200).send();
});

module.exports = router;