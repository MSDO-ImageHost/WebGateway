const express = require("express");
const router = express.Router();
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const {JWT_ENCODE, JWT_DECODE, TEST_USERS} = require("../mocking_data");


// Queue bindings
amqpClient.bindQueue(["ConfirmAccountCreation"]);

router.get('/', maybeJWT, function (req, res) {
    res.json(data)
});

// RequestAccountCreate // Request body contains this: `{username:<String>, email:<String>, password:<String>}`
router.post('/', function (req, res) {

    const newUser = {
        username:   req.body.username,
        user_email: req.body.email,
        password:   req.body.password,
        role:       "0"
    };

    //amqpClient.sendMessage(JSON.stringify(newUser), {}, "RequestAccountCreate").then(msg => {
    //    console.log("here", msg)
    //    res.status(201).json(newPost);
    //});
    
    const token = JWT_ENCODE({sub:0, role:0, iss: "ImageHost.sdu.dk"});
    TEST_USERS.push(newUser)
    res.status(201).json({token, user:newUser});
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