const express = require("express");

const router = express.Router();

router.post('/image', function (req, res) {
    //Creates an image
});
router.get('/image/:iid', function (req, res) {
    //Gets an image using its id
});
router.delete('/image/:iid', function (req, res) {
    //Deletes an image using its id.
});

module.exports = router;