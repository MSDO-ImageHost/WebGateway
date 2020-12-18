const {TEST_POSTS, TEST_COMMENTS} = require("../mocking_data");
const express = require("express");
const router = express.Router();

router.post('', function (req, res) {
    res.status(200).send();
});
router.delete('', function (req, res) {
    res.status(200).send();
});
router.get('', function (req, res) {
    //List all posts
    res.json(TEST_POSTS);
});
router.get('/:pid', function (req, res, next) {
    //Get a post using its id
    res.json(TEST_POSTS[0]);
});

router.get('/:pid/comments', function (req, res, next) {
    //Get a post using its id
    res.json(TEST_COMMENTS);
});

router.put('/:pid', function (req, res) {
    //Update a post
    res.status(200).send();
});
router.delete('/:pid', function (req, res) {
    //Delete a post
    res.status(200).send();
});
router.get('/posts', function (req, res) {
    //Get multiple posts
    res.status(200).send();
});
router.delete('/posts', function (req, res) {
    //Delete multiple posts
    res.status(200).send();
});
router.get('/:pid/history', function (req, res) {
    //Get the history of a post
    res.status(200).send();
});

module.exports = router;