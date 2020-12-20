const express = require("express");
const amqpClient = require("../amqp/AmqpClient")
const router = express.Router();

amqpClient.bindQueue(["ConfirmLikeUpdate", "ReturnLikesForPost", "ReturnLikeStatus"]);
router.get('/post/:pid/likes/:userid', function (req, res) {
    //RequestLikeStatus
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestLikeStatus").then(msg => {
        const result = JSON.parse(msg.toString());
        console.log("Received " + msg.toString());
        res.json(result);
    });
});
    
router.put('/post/:pid/likes/:userid', function (req, res) {
    //UpdateLike
    amqpClient.sendMessage(JSON.stringify(req.body),"UpdateLike").then(msg => {
        const result = JSON.parse(msg.toString());
        console.log("Received " + msg.toString());
        res.json(result)
    });
});
router.get('/post/:pid/likes', function (req, res) {
    //RequestLikesForPost
    console.log(req.body)
});

module.exports = router;