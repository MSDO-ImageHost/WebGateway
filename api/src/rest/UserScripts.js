const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");

const router = express.Router();


router.post('', validJWT, function (req, res) {
    //Creates a script
});
router.get('', validJWT, function (req, res) {
    //Gets a list of all scripts this user is allowed to see.
    res.json([
        {
            name: "Script 1",
            owner: "Dude",
            ownerId: 1,
            id: 1
        },
        {
            name: "Script 2",
            owner: "Dude",
            ownerId: 1,
            id: 2
        },
        {
            name: "Script 3",
            owner: "Mod",
            ownerId: 2,
            id: 3
        }
    ])
});
router.get('/:sid', validJWT, function (req, res) {
    //Gets a script using its id.
});
router.put('/:sid', validJWT, function (req, res) {
    //Updates a script using its id.
});
router.delete('/:sid', validJWT, function (req, res) {
    //Deletes a script using its id.
});
router.get('/:sid/run', validJWT, function (req, res) {
    //Gets a script to run using its id.
});

module.exports = router;