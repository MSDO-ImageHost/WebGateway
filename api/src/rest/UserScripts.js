const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");

const router = express.Router();

let mock = [
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
];

router.post('', validJWT, function (req, res) {
    //Creates a script
});
router.get('', validJWT, function (req, res) {
    //Gets a list of all scripts this user is allowed to see.
    res.json(mock)
});
router.get('/:sid', validJWT, function (req, res) {
    let data = Buffer.from(`Hello world! ${req.params.sid}`);
    res.send(data)
});
router.put('/:sid', validJWT, function (req, res) {
    //Updates a script using its id.
});
router.delete('/:sid', validJWT, function (req, res) {
    //Deletes a script using its id.
    mock = mock.filter((script) => script.id !== parseInt(req.params.sid));
    res.sendStatus(200)
});
router.get('/:sid/run', validJWT, function (req, res) {
    //Gets a script to run using its id.
});

module.exports = router;