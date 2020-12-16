const express = require("express");

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU0MDMyMDAsImlhdCI6MTY2NTQwMzIwMCwiaXNzIjoiSW1hZ2VIb3N0LnNkdS5kayIsInJvbGUiOjAsInN1YiI6IjEyIn0.0KKTtjDmMjQ9uRryM5LGGYK5Ko_sDsuCH_PqSIPrD2I";
router.post('/', function (req, res) {
    const user = req.params.user;
    const password = req.params.password;
    console.log("Logging in as " + user + " with password " + password);
    res.json({user, jwt})
});
router.get('/login', function (req, res) {
    //RequestLoginToken
});
router.put('/login', function (req, res) {
    //RequestAccountPasswordUpdate
});
router.delete('/login', function (req, res) {
    //invalidate token
});

module.exports = router;