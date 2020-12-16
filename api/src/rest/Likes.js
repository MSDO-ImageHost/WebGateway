const express = require("express");

const router = express.Router();

router.get('/post/:pid/likes/:userid', function (req, res) {
    //RequestLikeStatus
});
router.put('/post/:pid/likes/:userid', function (req, res) {
    //UpdateLike
});
router.get('/post/:pid/likes', function (req, res) {
    //RequestLikesForPost
});

module.exports = router;