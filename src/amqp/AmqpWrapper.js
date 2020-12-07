const AMQP = require('amqplib/callback_api');

class Authentication {

    constructor() {
        const AMQP_URI = process.env.AMQP_URI;
        AMQP.connect(AMQP_URI, this.onConnect)
    }

    publisher(connection){
        connection.createChannel(onOpen);
        function onOpen(err, channel) {
            if (err != null) hcf(err);
            const queue = "Authentication";
            channel.assertQueue("Authentication");
        }
    }

    onConnect(err, connection) {
        if (err != null) this.hcf(err);

    }
}

function hcf(err) {
    console.error(err);
    process.exit(1);
}