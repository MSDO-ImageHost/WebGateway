const {TEST_POSTS, TEST_COMMENTS, TEST_USERS, JWT_ENCODE, JWT_DECODE} = require("../mocking_data");

const jwtSimple = require("jwt-simple");

const express = require("express");
const amqpClient = require("../amqp/AmqpClient");
const router = express.Router();

amqpClient.bindQueue(["ReturnAuthenticationToken","ConfirmSetPassword","ConfirmInvalidateToken"])

const {validJWT, maybeJWT} = require("../jwtAuth");

// Creates a JWT for an a existing user (login) // Request body contains this: `{username:<String>, password:<String>}`
router.post('', function (req, res) {

    amqpClient.sendMessage(JSON.stringify(req.body),"RequestLoginToken",null).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = msg.content.toString();
            const json = JSON.parse(result);
            const authUser = {
                user_id: jwtSimple.decode(json.jwt, process.env.JWT_HMAC_SECRET).sub,
                username: json.username,
                user_email: json.user_email,
                role: json.role
            }
            res.status(200).json({token:json.jwt, user: authUser});
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
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
    var token = {
        "jwt":req.jwt
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestAccountPasswordUpdate",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            res.status(204);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});


// Terminates a users login session
// Look at later! Maybe not nessesary
router.delete('', validJWT, function (req, res) {
    //invalidate token
    res.status(200).send("Token invalidated");
});


module.exports = router;