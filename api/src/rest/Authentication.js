const {TEST_POSTS, TEST_COMMENTS, JWT_ENCODE, JWT_DECODE} = require("../mocking_data");

const express = require("express");
const {validJWT, maybeJWT} = require("../jwtAuth");

const router = express.Router();

// Creates a JWT for an a existing user (login)
router.post('', function (req, res) {

    // Request body contains this: `{username:<String>, password:<String>}`

    // {"sub":"5","role":"user","iss":"ImageHost.sdu.dk","exp":1638560713,"iat":1607024713}
    const token = JWT_ENCODE({sub: req.body.userid, role: 1, iss: "ImageHost.sdu.dk"});
    res.cookie('jwt', token).status(200).json({token});
});

// Updates a users password
router.get('', validJWT, function (req, res) {
    //RequestAccountPasswordUpdate
    res.json({
        token: req.jwt,
        claims: req.claims
    });
});

// Updates a users password
router.put('', validJWT, function (req, res) {
    //RequestAccountPasswordUpdate
    res.status(200).send();
});


// Terminates a users login session
router.delete('', validJWT, function (req, res) {
    //invalidate token
    res.status(200).send();
});


module.exports = router;