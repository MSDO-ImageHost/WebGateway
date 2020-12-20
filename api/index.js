const express = require("express");
const amqpClient = require("./src/amqp/AmqpClient");
const cookieParser = require("cookie-parser");

const amqpURI = process.env.AMQP_URI;
amqpClient.createClient({ url: amqpURI });

// API routers
const Authentication = require("./src/rest/Authentication.js");
const Accounts = require("./src/rest/Accounts.js");
const Posts = require("./src/rest/Posts.js");
const Scripts = require("./src/rest/UserScripts.js");
const ImageStorage = require("./src/rest/ImageStorage.js");
const Tags = require("./src/rest/Tags.js");


const app = express();

amqpClient.createChannel(amqpURI);

// Middleware parsers
app.use(cookieParser());
app.use(express.json());

// Custom middleware
app.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    console.log(`${req.method} ${req.baseUrl}${req.path}`);
    next();
});

// Artificial response delay
app.use((res, req, next) => {for (let i = 0; i < 2000000000; i++) {}; next()})


// Use required API routes
app.use('/api/login', Authentication);
app.use('/api/users', Accounts);
app.use('/api/posts', Posts);
app.use('/api/scripts', Scripts);
app.use('/api/images', ImageStorage);
app.use('/api/tags', Tags);

app.get('/ping', function(req, res) {
    amqpClient.sendMessage('{"message": "Ping"}', 'ping')
        .then(msg => {
            const result = JSON.parse(msg.toString());
            console.log("Received " + msg.toString());
            res.json(result)
        });
});

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, '../client/build')));

// Handles any requests that don't match the ones above
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, '../client/build/index.html'));
//});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);

// Capture interruption signal and terminate gracefully
process.on('SIGINT', () => {console.info("Interrupted"); process.exit(0)})