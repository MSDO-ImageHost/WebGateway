const {TEST_POSTS, TEST_COMMENTS, TEST_USERS, JWT_ENCODE, JWT_DECODE} = require("../mocking_data");

const express = require("express");

const amqpClient = require("../amqp/AmqpClient");
const router = express.Router();

amqpClient.bindQueue(["ReturnAuthenticationToken","ConfirmSetPassword","ConfirmInvalidateToken"])

const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const router = express.Router();

// Creates a JWT for an a existing user (login) // Request body contains this: `{username:<String>, password:<String>}`
router.post('', function (req, res) {
    // {"sub":"5","role":"user","iss":"ImageHost.sdu.dk","exp":1638560713,"iat":1607024713}
    //const token = JWT_ENCODE({sub:0, role:0, iss: "ImageHost.sdu.dk"});
    //findUser = { username:req.body.username, email:req.body.email, password:req.body.password }
    //found = TEST_USERS.find(user => {return user.username === findUser.username && user.password === findUser.password })
    //console.log(found)

    //if (found == undefined) {
    //    return res.status(401).send()
    //}
    //res.status(200).json({token, user:found});
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestLoginToken").then(msg => {
        const result = JSON.parse(msg.toString());
        console.log("Received " + msg.toString());
        res.json(result);
    });
});

// Updates a users password
//router.get('', validJWT, function (req, res) {
    //RequestAccountPasswordUpdate
    //res.json({
    //    token: req.jwt,
    //    claims: req.claims
    //});
//});

// Updates a users password
router.put('', validJWT, function (req, res) {
    //RequestAccountPasswordUpdate
    // FOR LATER: jwt = req.cookies["_auth_t"]
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestAccountPasswordUpdate").then(msg => {
        const result = JSON.parse(msg.toString());
        console.log("Inside data: " + JSON.stringify(result.data));
        console.log("Received " + msg.toString());
        res.json(result);
    });
});


// Terminates a users login session
// Look at later! 
router.delete('', validJWT, function (req, res) {
    //invalidate token
    
});


module.exports = router;