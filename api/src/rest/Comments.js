const express = require("express");
const router = express.Router();
const {validJWT, maybeJWT} = require("../jwtAuth");

const {TEST_COMMENTS} = require("../mocking_data");


router.post('/post/:pid/comments', validJWT, function (req, res) {
    //CreateComment
});
router.get('/post/:pid/comments', function (req, res) {
    res.status(200).json(TEST_COMMENTS)
    //RequestCommentsForPost
});
router.get('/post/:pid/comments/:cid', function (req, res) {
    //RequestComment
    res.status(200).json(TEST_COMMENTS[0])
});
router.put('/post/:pid/comments/:cid', validJWT, function (req, res) {
    //UpdateComment
});
router.delete('/post/:pid/comments/:cid', validJWT, function (req, res) {
    //DeleteComment
});

module.exports = router;