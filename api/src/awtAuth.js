const passport = require("passport");
const passportJWT = require("passport-jwt");
const {JWT_SECRET} = require("./mocking_data");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt")
};

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        return done(null, payload.sub);
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {session: false});
        }
    };
};