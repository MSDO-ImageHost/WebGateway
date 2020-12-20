const express = require("express");
const router = express.Router();
const {validJWT, maybeJWT} = require("../jwtAuth");

const {TEST_COMMENTS} = require("../mocking_data");



// Fetch a specific comment
router.get(':cid', function (req, res) {
    res.status(200).json(TEST_COMMENTS.find(c => c.comment_id))
});



// Update a specific comment
router.put(':cid', validJWT, function (req, res) {
    //UpdateComment
});



// Delete a specific comment
router.delete(':cid', validJWT, function (req, res) {
    //DeleteComment
});


module.exports = router;