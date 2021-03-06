const express = require("express");
const amqpClient = require("../amqp/AmqpClient")
const {validJWT, maybeJWT} = require("../jwtAuth");
const router = express.Router();

amqpClient.bindQueue(["ConfirmLikeUpdate", "ReturnLikesForPost", "ReturnLikeStatus"]);


router.get('/post/:pid/likes', validJWT, function (req, res) {

    const headers = {jwt:req.jwt}
    const payload = {post_id: req.params['pid']}

    amqpClient.sendMessage(JSON.stringify(payload),"RequestLikeStatus",headers).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});

// Updates likes for a post (adding and removing likes)
router.put('/', validJWT, function (req, res) {

    const payload = { post_id: req.body.post_id }
    const headers = {jwt:req.jwt}
    amqpClient.sendMessage(JSON.stringify(payload), "UpdateLike", headers).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});


// Gets amount of likes for a post
router.get('/:pid', function (req, res) {

    const post_id = {post_id: req.params['pid']}

    amqpClient.sendMessage(JSON.stringify(post_id),"RequestLikesForPost", {}).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});



module.exports = router;