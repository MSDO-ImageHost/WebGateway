const {TEST_POSTS, TEST_COMMENTS, TEST_USERS, JWT_ENCODE, JWT_DECODE} = require("../mocking_data");

const express = require("express");

const amqpClient = require("../amqp/AmqpClient");
const router = express.Router();

amqpClient.bindQueue(["ReturnAuthenticationToken","ConfirmSetPassword","ConfirmInvalidateToken"])

const {validJWT, maybeJWT} = require("../jwtAuth");

// Creates a JWT for an a existing user (login) // Request body contains this: `{username:<String>, password:<String>}`
router.post('', function (req, res) {

    const token = JWT_ENCODE({sub:"0", role:0, iss: "ImageHost.sdu.dk"});
    findUser = { username:req.body.username, email:req.body.email, password:req.body.password }
    found = TEST_USERS.find(user => {return user.username === findUser.username && user.password === findUser.password })
    if (found == undefined) {
        return res.status(401).send()
    }
    res.status(200).json({token, user:found});

    //amqpClient.sendMessage(JSON.stringify(req.body),"RequestLoginToken",null).then(msg => {
    //    if(msg.properties.headers.status_code === 200){
    //        const result = msg.content.toString();
    //        console.log("Received " + result);
    //        res.json(result);
    //    }
    //    else{
    //        res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
    //    }
    //});
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
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestAccountPasswordUpdate",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = msg.content.toString();
            console.log("Received " + result);
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});


// Terminates a users login session
// Look at later!
router.delete('', validJWT, function (req, res) {
    //invalidate token
    res.status(200).send("Token invalidated");
});


module.exports = router;