const express = require("express");
const path = require("path");
const amqpClient = require("./src/amqp/AmqpClient");
const passport = require("passport");
const jwtStrategy = require("passport-jwt");
const cookieParser = require("cookie-parser");

// API routes
const Authentication = require("./src/rest/Authentication.js");
const Accounts = require("./src/rest/Accounts.js");
const Posts = require("./src/rest/Posts.js");

const app = express();
const amqpURI = process.env.AMQP_URI;

let amqpChannel;
amqpClient.createClient({ url: amqpURI })
    .then(ch => {
    // channel is kept for later use
        amqpChannel = ch;
    });

app.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    console.log(`${req.method} ${req.baseUrl}${req.path}`);
    console.log(req.body);
    next();
});
app.use(cookieParser());

app.use(express.json());

// Use required API routes
app.use('/api/login', Authentication);
app.use('/api/user', Accounts);
app.use('/api/post', Posts);


app.get('/ping', function(req, res) {
    amqpClient.sendMessage(amqpChannel, '{"message": "Ping"}', 'ping')
        .then(msg => {
            const result = JSON.parse(msg.toString());
            console.log("Received " + msg.toString());
            res.json(result)
        });
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);

// Capture interruption signal and terminate gracefully
process.on('SIGINT', () => {console.info("Interrupted"); process.exit(0)})
