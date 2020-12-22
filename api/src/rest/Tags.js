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
    const headers = {jwt:req.jwt}

    amqpClient.sendMessage(JSON.stringify(req.body), "CreateTag", headers).then(msg => {
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
    const headers = {jwt:req.jwt}

    const payload = {
        tag_id: req.params['tid']
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RequestTag", headers).then(msg => {
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
    const headers = {jwt:req.jwt}

    const payload = {
        tag_id: req.params['tid'],
        new_name: req.body.new_name,
        new_desc: req.body.new_desc
    }
    amqpClient.sendMessage(JSON.stringify(payload), "UpdateTag", headers).then(msg => {
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
    const headers = {jwt:req.jwt}

    const payload = {
        tag_id: req.params['tid']
    }
    amqpClient.sendMessage(JSON.stringify(payload), "DeleteTag", headers).then(msg => {
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
    const headers = {jwt:req.jwt}

    const payload = {
        tag_id: req.params['tid']
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RequestPostsForTag", headers).then(msg => {
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
    const headers = {jwt:req.jwt}

    const payload = {
        post_id: req.params['pid'],
        tag_id: req.body.tag_id,
        post_author: req.body.post_author
    }
    amqpClient.sendMessage(JSON.stringify(payload), "AddTagToPost", headers).then(msg => {
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
    const headers = {jwt:req.jwt}

    const payload = {
        post_id: req.params['pid'],
        tag_id: req.body.tag_id,
        post_author: req.body.post_author
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RemoveTagFromPost", headers).then(msg => {
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