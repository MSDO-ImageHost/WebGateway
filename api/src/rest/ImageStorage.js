const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const router = express.Router();

amqpClient.bindQueue(["ImageLoadRequest", "ImageCreateRequest", "ImageDeleteRequest"]);

router.post('/image', validJWT, function (req, res) {
    //Creates an image
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"ImageCreateResponse",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = msg.content.toString();
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            // I am assuming you store a error message inside properties.headers.message, change if it is not true.
            // Also has to change is it is status_code, http_response, or a third thing.
            res.status(msg.properties.headers.status_code).send("[-] Failed to create image");
        }
    });
});
router.get('/image/:iid', function (req, res) {
    //Gets an image using its id
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"ImageLoadResponse",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = msg.content.toString();
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send("[-] Failed to get image");
        }
    });
});
router.delete('/image/:iid', validJWT, function (req, res) {
    //Deletes an image using its id.
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"ImageDeleteResponse",token).then(msg => {
        if(msg.properties.headers.status_code === 200){
            const result = msg.content.toString();
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send("[-] Failed to delete image");
        }
    });
});

module.exports = router;