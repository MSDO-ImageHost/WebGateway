const express = require("express");
const amqpClient = require("../amqp/AmqpClient")
const router = express.Router();

amqpClient.bindQueue(["ConfirmLikeUpdate", "ReturnLikesForPost", "ReturnLikeStatus"])
router.get('/post/:pid/likes/:userid', function (req, res) {
    //RequestLikeStatus
    console.log(req.body)
});
router.put('/post/:pid/likes/:userid', function (req, res) {
    //UpdateLike
    console.log(req.body)
});
router.get('/post/:pid/likes', function (req, res) {
    //RequestLikesForPost
    console.log(req.body)
});

module.exports = router;