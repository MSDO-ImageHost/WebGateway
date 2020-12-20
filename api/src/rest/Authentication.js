const {TEST_POSTS, TEST_COMMENTS, TEST_USERS, JWT_ENCODE, JWT_DECODE} = require("../mocking_data");

const express = require("express");

const amqpClient = require("../amqp/AmqpClient");
const router = express.Router();

amqpClient.bindQueue(["ReturnAuthenticationToken","ConfirmSetPassword","ConfirmInvalidateToken"])

const {validJWT, maybeJWT} = require("../jwtAuth");

const router = express.Router();

// Creates a JWT for an a existing user (login) // Request body contains this: `{username:<String>, password:<String>}`
router.post('', function (req, res) {
    // {"sub":"5","role":"user","iss":"ImageHost.sdu.dk","exp":1638560713,"iat":1607024713}
    const token = JWT_ENCODE({sub:0, role:0, iss: "ImageHost.sdu.dk"});
    findUser = { username:req.body.username, email:req.body.email, password:req.body.password }
    found = TEST_USERS.find(user => {return user.username === findUser.username && user.password === findUser.password })
    console.log(found)

    if (found == undefined) {
        return res.status(401).send()
    }
    res.status(200).json({token, user:found});
});

// Updates a users password
router.get('', validJWT, function (req, res) {
    //RequestAccountPasswordUpdate
    res.json({
        token: req.jwt,
        claims: req.claims
    });
});

// Updates a users password
router.put('', validJWT, function (req, res) {
    //RequestAccountPasswordUpdate
    res.status(200).send();
});


// Terminates a users login session
router.delete('', validJWT, function (req, res) {
    //invalidate token
    res.status(200).send();
});


module.exports = router;