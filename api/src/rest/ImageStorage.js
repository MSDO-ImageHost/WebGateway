const {TEST_IMAGES} = require("../mocking_data");

const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const router = express.Router();

amqpClient.bindQueue(["ImageLoadRequest", "ImageCreateRequest", "ImageDeleteRequest"]);


router.get('/:iid', function (req, res) {
    const token = {"jwt":req.cookies["_auth_t"]}
    const post_id = {post_id: req.params['iid']}

    console.log(post_id)

    amqpClient.sendMessage(JSON.stringify(post_id), "ImageLoadResponse", token).then(msg => {
        if(msg.properties.headers.status_code != 400){
            const result = JSON.parse(msg.content.toString());
            console.log(result)
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send("[-] Failed to get image");
        }
    });
});
router.delete('/:iid', validJWT, function (req, res) {
    //Deletes an image using its id.
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"ImageDeleteResponse",token).then(msg => {
        if(msg.properties.headers.status_code != 400){
            const result = msg.content.toString();
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.status_code).send("[-] Failed to delete image");
        }
    });
});



//router.post('/', validJWT, function (req, res) {
//    //Creates an image
//    const token = {
//        "jwt":req.cookies["_auth_t"]
//    }
//    amqpClient.sendMessage(JSON.stringify(req.body),"ImageCreateResponse",token).then(msg => {
//        if(msg.properties.headers.status_code != 400){
//            const result = msg.content.toString();
//            console.log("Received " + msg.content.toString());
//            res.json(result);
//        }
//        else{
//            // I am assuming you store a error message inside properties.headers.message, change if it is not true.
//            // Also has to change is it is status_code, http_response, or a third thing.
//            res.status(msg.properties.headers.status_code).send("[-] Failed to create image");
//        }
//    });
//});



module.exports = {api: router, images: express.Router()};