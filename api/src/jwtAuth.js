const {JWT_DECODE} = require("./mocking_data");

const BEARER_PREFIX = "Bearer ";

function validJWT(req, res, next) {
    try {
        let auth = req.header('Authorization');
        if (auth == null || !auth.startsWith(BEARER_PREFIX)) {
            //Reject because there is no valid token
            res.status(401).send();
        }
        let jwt = auth.split(" ")[1];
        console.log("Received jwt: " + jwt);
        //Verify JWT here
        let payload = JWT_DECODE(jwt);
        console.log("Received jwt payload: " + payload);
        req.claims = payload;
        next();
    } catch (e) {
        //This token is obviously cursed.
        res.status(401).send();
    }
}

function maybeJWT(req, res, next) {
    try {
        let auth = req.header('Authorization');
        if (auth == null || !auth.startsWith(BEARER_PREFIX)) {
            //Reject because there is no valid token
            res.status(401).send();
            next();
            return;
        }
        let jwt = auth.split(" ")[1];
        console.log("Received jwt: " + jwt);
        //Verify JWT here
        let payload = JWT_DECODE(jwt);
        console.log("Received jwt payload: " + payload);
        req.claims = payload;
        next();
    } catch (e) {
        //This token is obviously cursed.
        next();
    }
}

module.exports = {validJWT, maybeJWT};