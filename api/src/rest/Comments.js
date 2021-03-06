const express = require("express");
const router = express.Router();
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const {TEST_COMMENTS} = require("../mocking_data");

// Queue bindings
amqpClient.bindQueue(["ReturnComment", "ConfirmCommentUpdate", "ConfirmCommentDelete"]);

// Fetch a specific comment
router.get('/:cid', function (req, res) {
    var token = {
        jwt: req.jwt ? req.jwt : ""
    }
    const payload = {
        comment_id: req.params['cid'],
    }
    amqpClient.sendMessage(JSON.stringify(payload),"RequestComment",token).then(msg => {
        if(msg.properties.headers.http_response === 200){
            const result = JSON.parse(msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.http_response).send("Failed to fetch comment.");
        }
    });
});

// Update a specific comment
router.put('/:cid', validJWT, function (req, res) {
    //UpdateComment
    var token = {
        jwt: req.jwt ? req.jwt : ""
    }
    const payload = {
        comment_id: req.params['cid'],
        user_id: req.claims.sub,
        content: req.body.content
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "UpdateComment", token).then(msg => {
        if(msg.properties.headers.http_response === 200){
            const result = JSON.parse(msg.content.toString()); // Maybe not parse
            res.json(result); // status is per default 200
        }
        else{
            res.status(msg.properties.headers.http_response).send("Failed to update comment");
        }
    });
});

// Delete a specific comment
router.delete('/:cid', validJWT, function (req, res) {
    //DeleteComment
    var token = {
        jwt: req.jwt ? req.jwt : ""
    }
    const payload = {
        comment_id: req.params['cid'],
        user_id: req.claims.sub
    }
    console.log(payload)
    amqpClient.sendMessage(JSON.stringify(payload), "DeleteComment", token).then(msg => {
        if(msg.properties.headers.http_response === 200){
            const result = JSON.parse(msg.content.toString()); // Maybe not parse
            res.json(result); // status is per default 200
        }
        else{
            res.status(msg.properties.headers.http_response).send("Failed to delete comment");
        }
    });
});


module.exports = router;
