const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient")
const router = express.Router();

amqpClient.bindQueue(["ConfirmUserScriptCreation", "ConfirmUserScriptUpdate", "ConfirmUserScriptDeletion", "ConfirmUserScriptRunning", "ReturnUsersUserScripts", "ReturnUserScript"]);

router.post('/CreateUserScript', validJWT, function (req, res) {
    //Creates a script
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    console.log(req.body)
    amqpClient.sendMessage(JSON.stringify(req.body),"CreateUserScript",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = JSON.parse(msg.content.toString());
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.get('/FindOwnUserScripts', validJWT, function (req, res) {
    //Gets a list of all scripts this user is allowed to see.
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    var body = {
      "user_id":req.claims.sub
    }
    amqpClient.sendMessage(JSON.stringify(body),"FindUsersUserScripts",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = JSON.parse(msg.content.toString());
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.post('/FindUsersUserScripts', validJWT, function (req, res) {
    //Gets a list of all scripts this user is allowed to see.
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"FindUsersUserScripts",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = JSON.parse(msg.content.toString());
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.post('/FindUserScript', validJWT, function (req, res) {
    //Gets a list of all scripts this user is allowed to see.
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    console.log(req.body)
    amqpClient.sendMessage(JSON.stringify(req.body),"FindUserScript",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = JSON.parse(msg.content.toString());
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.post('/UpdateUserScript', validJWT, function (req, res) {
    //Updates a script using its id.
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    console.log(req.body)
    amqpClient.sendMessage(JSON.stringify(req.body),"UpdateUserScript",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = JSON.parse(msg.content.toString());
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.post('/DeleteUserScript', validJWT, function (req, res) {
    //Deletes a script using its id.
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"DeleteUserScript",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = JSON.parse(msg.content.toString());
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.post('/RunUserScript', validJWT, function (req, res) {
    //Gets a script to run using its id.
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"RunUserScript",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = JSON.parse(msg.content.toString());
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

module.exports = router;
