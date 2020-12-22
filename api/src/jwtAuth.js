const {JWT_DECODE} = require("./mocking_data");

function validJWT(req, res, next) {
    try {
        let jwt = req.cookies["_auth_t"] || req.header('Authorization').split(" ")[1];
        if (jwt == null) {
            //Reject because there is no valid token
            res.status(401).send();
            return;
        }
        // console.log("Received jwt: " + jwt);
        //Verify JWT here
        let payload = JWT_DECODE(jwt);
        // console.log("Received jwt payload: " + JSON.stringify(payload));
        req.jwt = jwt;
        req.claims = payload;
        next();
    } catch (e) {
        //This token is obviously cursed.
        res.status(401).send();
    }
}

function maybeJWT(req, res, next) {
    try {
        let jwt = req.cookies["_auth_t"] || req.header('Authorization').split(" ")[1];
        if (jwt == null) {
            //Reject because there is no valid token
            next();
            return;
        }
        // console.log("Received jwt: " + jwt);
        //Verify JWT here
        let payload = JWT_DECODE(jwt);
        // console.log("Received jwt payload: " + JSON.stringify(payload));
        req.jwt = jwt;
        req.claims = payload;
        next();
    } catch (e) {
        next();
    }
}

module.exports = {validJWT, maybeJWT};