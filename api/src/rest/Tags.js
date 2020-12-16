const express = require("express");

const router = express.Router();

router.post('/tag', function (req, res) {
    //CreateTag
});
router.get('/tag/:tid', function (req, res) {
    //RequestTag
});
router.put('/tag/:tid', function (req, res) {
    //UpdateTag
});
router.delete('/tag/:tid', function (req, res) {
    //DeleteTag
});
router.get('/post/:pid/tags', function (req, res) {
    //RequestTagsForPost
});
router.post('/post/:pid/tags', function (req, res) {
    //AddTagToPost
});
router.delete('/post/:pid/tags', function (req, res) {
    //RemoveTagFromPost
});

module.exports = router;