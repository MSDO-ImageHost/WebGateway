const express = require("express");

const router = express.Router();

router.post('/post/:pid/comments', function (req, res) {
    //CreateComment
});
router.get('/post/:pid/comments', function (req, res) {
    //RequestCommentsForPost
});
router.get('/post/:pid/comments/:cid', function (req, res) {
    //RequestComment
});
router.put('/post/:pid/comments/:cid', function (req, res) {
    //UpdateComment
});
router.delete('/post/:pid/comments/:cid', function (req, res) {
    //DeleteComment
});

module.exports = router;