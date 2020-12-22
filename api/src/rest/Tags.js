const express = require("express");
const amqpClient = require("../amqp/AmqpClient")
const {validJWT, maybeJWT} = require("../jwtAuth");

const router = express.Router();

amqpClient.bindQueue([
    "ConfirmTagCreation",
    "ConfirmTagUpdate",
    "ConfirmTagDelete",
    "ConfirmAddedTag",
    "ConfirmTagRemoval",
    "ReturnTag",
    "ReturnPostsForTag"
]);

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

router.get('/:tid', function (req, res) {
    //RequestTag
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    const payload = {
        tag_id: req.params['tid']
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RequestTag", token).then(msg => {
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

router.put('/:tid', function (req, res) {
    //UpdateTag
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    const payload = {
        tag_id: req.params['tid'],
        new_name: req.body.new_name,
        new_desc: req.body.new_desc
    }
    amqpClient.sendMessage(JSON.stringify(payload), "UpdateTag", token).then(msg => {
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

router.delete('/:tid', validJWT, function (req, res) {
    //DeleteTag
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    const payload = {
        tag_id: req.params['tid']
    }
    amqpClient.sendMessage(JSON.stringify(payload), "DeleteTag", token).then(msg => {
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

router.get('/:tid/posts', validJWT, function (req, res) {
    //RequestPostsForTag
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    const payload = {
        tag_id: req.params['tid']
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RequestPostsForTag", token).then(msg => {
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
    const payload = {
        post_id: req.params['pid'],
        tag_id: req.body.tag_id,
        post_author: req.body.post_author
    }
    amqpClient.sendMessage(JSON.stringify(payload), "AddTagToPost", token).then(msg => {
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
    const payload = {
        post_id: req.params['pid'],
        tag_id: req.body.tag_id,
        post_author: req.body.post_author
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RemoveTagFromPost", token).then(msg => {
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