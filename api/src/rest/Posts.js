const express = require("express");
const router = express.Router();


router.post('', function (req, res) {
    //Creates a post
});
router.get('/:pid', function (req, res, next) {
    //Get a post using its id
    next()
});
router.put('/:pid', function (req, res) {
    //Update a post
});
router.delete('/:pid', function (req, res) {
    //Delete a post
});
router.get('/posts', function (req, res) {
    //Get multiple posts
});
router.delete('/posts', function (req, res) {
    //Delete multiple posts
});
router.get('/:pid/history', function (req, res) {
    //Get the history of a post
});
router.get('/user/:id/posts', function (req, res) {
    //Get the posts a user have created
});

module.exports = router;