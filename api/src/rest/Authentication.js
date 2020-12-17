const express = require("express");
const router = express.Router();


const test_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU0MDMyMDAsImlhdCI6MTY2NTQwMzIwMCwiaXNzIjoiSW1hZ2VIb3N0LnNkdS5kayIsInJvbGUiOjAsInN1YiI6IjEyIn0.0KKTtjDmMjQ9uRryM5LGGYK5Ko_sDsuCH_PqSIPrD2I";


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    console.log(`${req.method} ${req.baseUrl}${req.path} Triggered`)
    next();
});


// Creates a new user (signup)
router.post('/login', function (req, res) {
    console.log("here")
    res.status(200).redirect('/')
});


// Signs in a existing user
router.get('/login', function (req, res) {
});


// Updates a users password
router.put('/login', function (req, res) {
    //RequestAccountPasswordUpdate
});


// Terminates a users login session
router.delete('/login', function (req, res) {
    //invalidate token
});


module.exports = router;