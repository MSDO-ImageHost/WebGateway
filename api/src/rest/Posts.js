const {TEST_IMAGES} = require("../mocking_data");
const {validJWT, maybeJWT} = require("../jwtAuth");
const express = require("express");
const router = express.Router();
const amqpClient = require("../amqp/AmqpClient");

// Queue bindings
amqpClient.bindQueue([
    "ConfirmOnePostCreation",
    "ReturnManyPosts",
    "ReturnOnePost",
    "ReturnPostHistory",
    "ReturnUserPosts",
    "ConfirmUpdateOnePost",
    "ConfirmDeleteOnePost",
    "ConfirmDeleteManyPosts",
    "ConfirmCommentCreation",
    "ReturnCommentsForPost"
]);

// Create a new post
router.post('/', validJWT, function (req, res) {
    const newPost = {
        header: req.body.header,
        body: req.body.body,
        image_data: req.body.image_data.base64.split(',')[1],
        tags: req.body.tags.replace(' ', '').split(',')
    };

    TEST_IMAGES.push({image_data: newPost.image_data})

    amqpClient.sendMessage(JSON.stringify(newPost), "CreateOnePost", {jwt:req.jwt}).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(201).json(msgJson);
    });
});

// Get many posts
router.get('/', function (req, res) {
    amqpClient.sendMessage(JSON.stringify({}), "RequestManyPosts", null).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(200).json(msgJson);
    });
});

// Get a single post
router.get('/:pid', function (req, res, next) {
    const post_id = req.params['pid']
    amqpClient.sendMessage(JSON.stringify({post_id}), "RequestOnePost", null).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(200).json(msgJson);
    });
});

// Get all edits/updates of a single post using it's id
router.get('/:pid/history', function (req, res) {
    amqpClient.sendMessage(JSON.stringify({post_id}), "RequestPostHistory", {jwt:req.jwt}).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(200).json(msgJson);
    });
});

// Create a new comment for a post
router.post('/:pid/comments', validJWT, function (req, res) {
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"CreateComment",token).then(msg => {
        if(msg.properties.headers.http_response === 200){
            const result = msg.content.toString();
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.http_response).send("Failed to create comment.");
        }
    });
    /*
    const newComment = {
        post_id: req.params['pid'],
        content: req.body.content,
        author_id: 'Christian',
        created_at: Date.now(),
        comment_id: TEST_COMMENTS.length
    }
    TEST_COMMENTS.push(newComment)
    res.status(201).json(newComment)*/
});


// Get all comments for a specific post
router.get('/:pid/comments', function (req, res, next) {
    //res.status(200).json(TEST_COMMENTS.filter(c => c.post_id === req.params['pid']))
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body),"RequestCommentsForPost",token).then(msg => {
        if(msg.properties.headers.http_response === 200){
            const result = msg.content.toString();
            console.log("Received " + msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.http_response).send("Failed to fetch comments for post.");
        }
    });
});

// Update a post
router.put('/:pid', validJWT, function (req, res) {
    const updatedPost = { post_id: res.params['pid'], header: req.body.header, body: req.body.body};
    amqpClient.sendMessage(JSON.stringify(updatedPost), "UpdateOnePost", {jwt:req.jwt}).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(204).json(msgJson);
    });
});

// Delete one post using it's id
router.delete('/:pid', validJWT, function (req, res) {
    post_id = res.params['pid']
    amqpClient.sendMessage(JSON.stringify({post_id}), "DeleteOnePost", {jwt:req.jwt}).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(204).json(msgJson);
    });
});

// Delete many posts using their ids
router.delete('/', validJWT, function (req, res) {
    post_ids = req.body.post_ids
    amqpClient.sendMessage(JSON.stringify({post_ids}), "DeleteManyPosts", {jwt:req.jwt}).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(204).json(msgJson);
    });
});



module.exports = router;