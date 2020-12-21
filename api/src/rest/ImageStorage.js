const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const apiRouter = express.Router();

amqpClient.bindQueue(["ImageLoadResponse"]);

apiRouter.get('/:iid', function (req, res) {
    //Gets an image using its id
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify({"post_id": req.params.iid}), "ImageLoadRequest", token).then(msg => {
        if (msg.properties.headers.http_response === 200) {
            const result = msg.content.toString();
            res.json(result);
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

const imageRouter = express.Router();

/**
 * imageRouter.get('/:path', function (req, res) {
    let iid = req.params.path.split("\.")[0];
    //Gets an image using its id
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify({"post_id": iid}),"ImageLoadRequest",token).then(msg => {
        if(msg.properties.headers.http_response === 200){
            const result = msg.content.toString();
            const b64 = JSON.parse(result).image_data;
            const data = Buffer.from(b64, 'base64');
            res.status(200).
        }
        else{
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
 */

module.exports = {api: apiRouter, images: imageRouter};