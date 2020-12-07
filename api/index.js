const express = require("express");
const path = require("path");

const Authentication = require("./src/rest/Authentication.js");
const Accounts = require("./src/rest/Accounts.js");
const amqpClient = require("./src/amqp/AmqpClient");

const app = express();

const amqpURI = process.env.AMQP_URI;
let amqpChannel;
amqpClient.createClient({ url: amqpURI })
    .then(ch => {
        // channel is kept for later use
        amqpChannel = ch;
    });

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.use('/api/auth', Authentication);
app.use('/api/account', Accounts);

app.get('/ping', function(req, res) {
    console.log("Received ping");
    amqpClient.sendRPCMessage(amqpChannel, "Ping", 'ping')
        .then(msg => {
            const result = JSON.parse(msg.toString());
            console.log("Sending " + msg.toString());
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
