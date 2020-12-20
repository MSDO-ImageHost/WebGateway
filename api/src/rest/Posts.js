const {TEST_POSTS, TEST_COMMENTS, ADD_POST} = require("../mocking_data");
const {validJWT, maybeJWT} = require("../jwtAuth");
const express = require("express");
const router = express.Router();
const app = express();


router.post('', function (req, res) {

    const postdata = req.body;
    ADD_POST({
        author_id: "Jake",
        header: postdata.header,
        body: postdata.body,
        image_data: "/images/thisisfine.gif",
        tags: postdata.tags
    });
    res.status(201).json(TEST_POSTS[TEST_POSTS.length-1]);
});

router.delete('', validJWT, function (req, res) {
    res.status(200).send();
});

router.get('', function (req, res) {
    //List all posts
    res.json(TEST_POSTS);
});

router.get('/:pid', function (req, res, next) {
    res.json(TEST_POSTS[0]);
});

// Create a new comment for a post
router.post('/:pid/comments', /*validJWT,*/ function (req, res) {
    //CreateComment on post
    const newComment = {
        post_id: req.params['pid'],
        content: req.body.content,
        author_id: 'Christian',
        created_at: Date.now(),
        comment_id: TEST_COMMENTS.length
    }
    TEST_COMMENTS.push(newComment)
    res.status(201).json(newComment)
});


// Get all comments for a specific post
router.get('/:pid/comments', function (req, res, next) {
    res.status(200).json(TEST_COMMENTS.filter(c => c.post_id === req.params['pid']))
});

router.put('/:pid', validJWT, function (req, res) {
    //Update a post
    res.status(200).send();
});

router.delete('/:pid', validJWT, function (req, res) {
    //Delete a post
    res.status(200).send();
});

router.get('/posts', function (req, res) {
    //Get multiple posts
    res.status(200).send();
});

router.delete('/posts', validJWT, function (req, res) {
    //Delete multiple posts
    res.status(200).send();
});

router.get('/:pid/history', function (req, res) {
    //Get the history of a post
    res.status(200).send();
});


module.exports = router;