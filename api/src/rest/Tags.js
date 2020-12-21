const express = require("express");
const amqpClient = require("../amqp/AmqpClient")
const {validJWT, maybeJWT} = require("../jwtAuth");

const router = express.Router();

amqpClient.bindQueue(["ConfirmTagCreation", "ConfirmTagUpdate", "ConfirmTagDelete", "ConfirmAddedTag", "ConfirmTagRemoval", "ReturnTag"]);

router.post('/tag', validJWT, function (req, res) {
    //CreateTag
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "CreateTag", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + msg.content);
            res.json(result);
        }
        else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

router.get('/tag/:tid', function (req, res) {
    //RequestTag
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "RequestTag", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + msg.content);
            res.json(result);
        }
        else {
            res.status(msg.properties.headers.status_code).json(msg.properties.headers.message);
        }
    });
});

router.put('/tag/:tid', function (req, res) {
    //UpdateTag
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "UpdateTag", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + msg.content);
            res.json(result);
        }
        else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

router.delete('/tag/:tid', validJWT, function (req, res) {
    //DeleteTag
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "DeleteTag", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + msg.content);
            res.json(result);
        }
        else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

router.post('/post/:pid/tags', validJWT, function (req, res) {
    //AddTagToPost
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "AddTagToPost", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + msg.content);
            res.json(result);
        }
        else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

router.delete('/post/:pid/tags', validJWT, function (req, res) {
    //RemoveTagFromPost
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "RemoveTagFromPost", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + msg.content);
            res.json(result);
        }
        else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

module.exports = router;