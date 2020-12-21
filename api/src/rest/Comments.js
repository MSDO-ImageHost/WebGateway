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
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestComment",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = msg.content.toString();
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

// Update a specific comment
router.put('/:cid', validJWT, function (req, res) {
    //UpdateComment
    amqpClient.sendMessage(JSON.stringify(req.body), {jwt:req.jwt}, "UpdateComment").then(msg => {
        if(msg.properties.headers.status_code === 200){
            console.log("Received " + msg.content.toString());
            const result = msg.content.toString(); // Maybe not parse
            console.log("Received " + msg.content.toString());
            res.json(result); // status is per default 200
        }
        else{
            res.status(msg.properties.headers.status_code).send("Failed to update comment");
        }
    });
});

// Delete a specific comment
router.delete('/:cid', validJWT, function (req, res) {
    //DeleteComment
    amqpClient.sendMessage(JSON.stringify(req.body), {jwt:req.jwt}, "DeleteComment").then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = msg.content.toString(); // Maybe not parse
            console.log("Received " + msg.content.toString());
            res.json(result); // status is per default 200
        }
        else{
            res.status(msg.properties.headers.status_code).send("Failed to delete comment");
        }
    });
});


module.exports = router;