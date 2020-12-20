const express = require("express");
const amqpClient = require("../amqp/AmqpClient")
const {validJWT, maybeJWT} = require("../jwtAuth");
const router = express.Router();

amqpClient.bindQueue(["ConfirmLikeUpdate", "ReturnLikesForPost", "ReturnLikeStatus"]);
router.get('/post/:pid/likes/:userid', validJWT, function (req, res) {
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestLikeStatus",token).then(msg => {
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
    
router.put('/post/:pid/likes/:userid',validJWT, function (req, res) {
    //UpdateLike
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"UpdateLike",token).then(msg => {
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
router.get('/post/:pid/likes', function (req, res) {
    //RequestLikesForPost
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestLikesForPost",null).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = msg.content.toString();
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
    console.log(req.body)
});

module.exports = router;