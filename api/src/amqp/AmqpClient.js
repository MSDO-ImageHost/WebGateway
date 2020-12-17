const AMQP = require('amqplib');
const EventEmitter = require('events');
const { v4: uuid } = require('uuid');

// this queue name will be attached to "replyTo" property on producer's message,
// and the consumer will use it to know which queue to the response back to the producer
const QUEUE = process.env.GATEWAY_QUEUE || "gateway-queue";
const EXCHANGE = "rapid";

/**
 * Create AMQP channel and return back as a promise
 * @params {Object} setting
 * @params {String} setting.url
 * @returns {Promise} - return AMQP channel
 */

const createClient = (setting) => AMQP.connect(setting.url)
        .then(conn => {
            console.log("Created channel!")
            return conn.createChannel()
        })
        .then(channel => {
            console.log("Created queue!")
            channel.assertQueue(QUEUE, { durable: true });
            console.log("Created exchange!")
            channel.assertExchange(EXCHANGE, 'direct', {durable: false});
            channel.responseEmitter = new EventEmitter();
            channel.responseEmitter.setMaxListeners(0);
            channel.consume(QUEUE, function(msg) {
                console.log("[x] " + msg.properties);
                channel.responseEmitter.emit(msg.properties.correlationId, msg.content);
            } , { noAck: true } );
            return channel;
        });

const bindQueue = (channel,events) => {
    events.forEach(event =>{
        channel.bindQueue(QUEUE, EXCHANGE, event);
    });
}

/**
 * Send event to direct exchange and return promise object when
 * event has been emitted from the "consume" function
 * @params {Object} channel - AMQP channel
 * @params {String} message - message to send to consumer
 * @params {String} event - name of the event
 * @returns {Promise} - return msg that send back from consumer
 */
const sendMessage = (channel, message, event) => new Promise(resolve => {
    console.log(" [x] Sending " + event);
    const cID = uuid();
    channel.responseEmitter.once(cID, resolve);
    var options = {
        correlationId: cID,
        contentType: "application/json"
    };
    channel.publish(EXCHANGE,event,Buffer.from(message), options);
});

module.exports.createClient = createClient;
module.exports.sendMessage = sendMessage;
module.exports.bindQueue = bindQueue;
