const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");

const router = express.Router();


router.post('/script', validJWT, function (req, res) {
    //Creates a script
});
router.get('/script/:sid', validJWT, function (req, res) {
    //Gets a script using its id.
});
router.put('/script/:sid', validJWT, function (req, res) {
    //Updates a script using its id.
});
router.delete('/script/:sid', validJWT, function (req, res) {
    //Deletes a script using its id.
});
router.get('/script/:sid/run', validJWT, function (req, res) {
    //Gets a script to run using its id.
});

module.exports = router;