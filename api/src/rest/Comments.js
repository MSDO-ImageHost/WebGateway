const express = require("express");
const router = express.Router();
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const {TEST_COMMENTS} = require("../mocking_data");

// Queue bindings
amqpClient.bindQueue(["ReturnComment", "ConfirmCommentUpdate", "ConfirmCommentDelete"]);

// Fetch a specific comment
router.get('/:cid', function (req, res) {
    const headers = {jwt:req.jwt}
    const payload = {comment_id: req.params['cid'] }
    amqpClient.sendMessage(JSON.stringify(payload),"RequestComment",headers).then(msg => {
        if(msg.properties.headers.http_response !== 200) {
            return res.status(msg.properties.headers.http_response).send("Failed to fetch comment.");
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});

// Update a specific comment
router.put('/:cid', validJWT, function (req, res) {
    //UpdateComment
    const headers = {jwt:req.jwt}

    const payload = {
        comment_id: req.params['cid'],
        user_id: req.claims.sub,
        content: req.body.content
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "UpdateComment", headers).then(msg => {
        if(msg.properties.headers.http_response !== 200) {
            return res.status(msg.properties.headers.http_response).send("Failed to update comment");
        }
        //console.log("Received " + msg.content.toString());
        const result = JSON.parse(msg.content.toString()); // Maybe not parse
        //console.log("Received " + msg.content.toString());
        res.json(result); // status is per default 200
    });
});

// Delete a specific comment
router.delete('/:cid', validJWT, function (req, res) {
    //DeleteComment
    const headers = {jwt:req.jwt}
    const payload = {
        comment_id: req.params['cid'],
        user_id: req.claims.sub
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "DeleteComment", headers).then(msg => {
        if(msg.properties.headers.http_response !== 200) {
            res.status(msg.properties.headers.http_response).send("Failed to delete comment");
        }
        const result = JSON.parse(msg.content.toString()); // Maybe not parse
        //console.log("Received " + msg.content.toString());
        res.json(result); // status is per default 200
    });
});


module.exports = router;