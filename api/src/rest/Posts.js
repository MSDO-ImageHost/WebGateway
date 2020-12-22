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
    "ReturnCommentsForPost",
    "ReturnTagsForPost"
]);


// Create a new post
router.post('/', validJWT, function (req, res) {
    const headers = {"jwt":req.jwt}
    const newPost = {
        header: req.body.header,
        body: req.body.body,
        image_data: req.body.image_data.base64.split(',')[1],
        tags: req.body.tags.replace(' ', '').split(',')
    };
    amqpClient.sendMessage(JSON.stringify(newPost), "CreateOnePost", headers).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(201).json(msgJson);
    });
});

// Get many posts
router.get('/', function (req, res) {
    amqpClient.sendMessage(JSON.stringify({}), "RequestManyPosts", {}).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(200).json(msgJson);
    });
});

// Get a single post
router.get('/:pid', function (req, res, next) {
    const post_id = req.params['pid']
    amqpClient.sendMessage(JSON.stringify({post_id}), "RequestOnePost", {}).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(200).json(msgJson);
    });
});

// Get all edits/updates of a single post using it's id
router.get('/:pid/history', function (req, res) {
    amqpClient.sendMessage(JSON.stringify({post_id}), "RequestPostHistory", {}).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(200).json(msgJson);
    });
});

// Create a new comment for a post /api/posts/<post_id>/comments <- {"content": "kommentar!!"}
router.post('/:pid/comments', validJWT, function (req, res) {
    const token = {"jwt":req.cookies["_auth_t"]}
    const payload = {
        user_id: req.claims.sub,
        post_id: req.params['pid'],
        content: req.body.content
    }
    amqpClient.sendMessage(JSON.stringify(payload),"CreateComment",token).then(msg => {
        if(msg.properties.headers.http_response === 200){
            const result = JSON.parse(msg.content.toString());
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.http_response).send("Failed to create comment.");
        }
    });
});


// Get all comments for a specific post
router.get('/:pid/comments', function (req, res, next) {
    //res.status(200).json(TEST_COMMENTS.filter(c => c.post_id === req.params['pid']))
    var token = {
        "jwt":req.cookies["_auth_t"]
    }
    const payload = {
        post_id: req.params['pid']
    }
    amqpClient.sendMessage(JSON.stringify(payload),"RequestCommentsForPost",token).then(msg => {
        if(msg.properties.headers.http_response === 200){
            const result = JSON.parse(msg.content.toString()).list_of_comments;
            res.json(result);
        }
        else{
            res.status(msg.properties.headers.http_response).send("Failed to fetch comments for post.");
        }
    });
});


// TODO: Service fails if no JWT is present
// Get all tags for a specific post
router.get('/:pid/tags', function (req, res, next) {
    return res.status(200).json(["Hello", "This", "is", "fine"]);

    const headers = {jwt:req.jwt}
    const payload = { post_id: req.params['pid']}
    amqpClient.sendMessage(JSON.stringify(payload), "RequestTagsForPost", {}).then(msg => {
        // Request could not be fulfilled
        if (msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.status_code);
        }
        const result = JSON.parse(msg.content.toString());
    });
});

// Update a post
router.put('/:pid', validJWT, function (req, res) {
    const headers = {jwt:req.jwt}

    const updatedPost = { post_id: res.params['pid'], header: req.body.header, body: req.body.body};
    amqpClient.sendMessage(JSON.stringify(updatedPost), "UpdateOnePost", headers).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(204).json(msgJson);
    });
});

// Delete one post using it's id
router.delete('/:pid', validJWT, function (req, res) {
    const headers = {jwt:req.jwt}
    post_id = res.params['pid']
    amqpClient.sendMessage(JSON.stringify({post_id}), "DeleteOnePost", headers).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(204).json(msgJson);
    });
});

// Delete many posts using their ids
router.delete('/', validJWT, function (req, res) {
    const headers = {jwt:req.jwt}
    post_ids = req.body.post_ids
    amqpClient.sendMessage(JSON.stringify({post_ids}), "DeleteManyPosts", headers).then(msg => {
        msgJson = JSON.parse(msg.content.toString())
        res.status(204).json(msgJson);
    });
});



module.exports = router;