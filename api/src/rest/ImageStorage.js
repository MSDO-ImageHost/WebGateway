const {BASE64_IMAGE, TEST_IMAGES} = require("../mocking_data");
const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const router = express.Router();

amqpClient.bindQueue(["ImageLoadRequest", "ImageCreateRequest", "ImageDeleteRequest"]);


router.get('/:iid', function (req, res) {
    return res.status(200).json({image_data: `data:image/jpeg;base64,${BASE64_IMAGE}`})


    const headers = {jwt:req.jwt}
    const post_id = {post_id: req.params['iid']}
    amqpClient.sendMessage(JSON.stringify(post_id), "ImageLoadResponse", headers).then(msg => {
        if(msg.properties.headers.status_code !== 200){
            const result = JSON.parse(msg.content.toString());
            res.json(result);
        }
        res.status(msg.properties.headers.status_code).send("[-] Failed to get image");

    });
});
router.delete('/:iid', validJWT, function (req, res) {
    //Deletes an image using its id.
    const headers = {jwt:req.jwt}
    amqpClient.sendMessage(JSON.stringify(req.body),"ImageDeleteResponse",headers).then(msg => {
        if(msg.properties.headers.status_code != 400){
            const result = msg.content.toString();
            //console.log("Received " + msg.content.toString());
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
//        "jwt":req.jwt
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