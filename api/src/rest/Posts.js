const express = require("express");

const router = express.Router();

router.post('/post', function (req, res) {
    //Creates a post
});
router.get('/post/:pid', function (req, res) {
    //Get a post using its id
});
router.put('/post/:pid', function (req, res) {
    //Update a post
});
router.delete('/post/:pid', function (req, res) {
    //Delete a post
});
router.get('/posts', function (req, res) {
    //Get multiple posts
});
router.delete('/posts', function (req, res) {
    //Delete multiple posts
});
router.get('/post/:pid/history', function (req, res) {
    //Get the history of a post
});
router.get('/user/:id/posts', function (req, res) {
    //Get the posts a user have created
});

module.exports = router;