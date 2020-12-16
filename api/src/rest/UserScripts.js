const express = require("express");

const router = express.Router();

router.post('/script', function (req, res) {
    //Creates a script
});
router.get('/script/:sid', function (req, res) {
    //Gets a script using its id.
});
router.put('/script/:sid', function (req, res) {
    //Updates a script using its id.
});
router.delete('/script/:sid', function (req, res) {
    //Deletes a script using its id.
});
router.get('/script/:sid/run', function (req, res) {
    //Gets a script to run using its id.
});

module.exports = router;