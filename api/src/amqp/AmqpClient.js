const AMQP = require('amqplib');
const EventEmitter = require('events');
const { v4: uuid } = require('uuid');
const { create } = require('domain');

// this queue name will be attached to "replyTo" property on producer's message,
// and the consumer will use it to know which queue to the response back to the producer
const QUEUE = process.env.GATEWAY_QUEUE || "gateway-queue";
const EXCHANGE = "rapid";
var amqpPromise;
/**
 * Create AMQP channel and return back as a promise
 * @params {Object} setting
 * @params {String} setting.url
 * @returns {Promise} - return AMQP channel
 */

 function createChannel(url){
    amqpPromise = AMQP.connect(url).then(conn => {
        return conn.createChannel()
    }).then(channel => {
        channel.assertQueue(QUEUE, { durable: true });
        console.log("Asserted queue!")
        channel.assertExchange(EXCHANGE, 'direct', {durable: false});
        console.log("Asserted exchange!")
        channel.responseEmitter = new EventEmitter();
        channel.responseEmitter.setMaxListeners(0);
        channel.consume(QUEUE, function(msg) {
            console.log("[x] " + msg.properties);
            channel.responseEmitter.emit(msg.properties.correlationId, msg);
        } , { noAck: true } );
        return channel;
    }).catch( () => {
        setTimeout(createChannel, 5000, url) //Retry every 5s
    });
 }

const bindQueue = (events) => {
    amqpPromise.then( (channel) => {
        events.forEach(event =>{
            channel.bindQueue(QUEUE, EXCHANGE, event);
            console.log(" [x] Binding " + QUEUE + " to " + EXCHANGE + " with RK: " + event);
        })
    }).catch( () => {
        setTimeout(bindQueue, 5000, events) //Retry every 5s
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
const sendMessage = (message, event, headers) => new Promise(resolve => {
    amqpPromise.then( (channel) => {
        console.log(" [x] Sending " + event);
        const cID = uuid();
        channel.responseEmitter.once(cID, resolve);
        var options = {
            correlationId: cID,
            contentType: "application/json",
            headers: headers
        };
        channel.publish(EXCHANGE,event,Buffer.from(message), options);
    }).catch( () => {
        setTimeout(sendMessage, 5000, message, event) //Retry every 5s
    });
});

module.exports.createChannel = function(url) {createChannel(url)};
module.exports.sendMessage = sendMessage;
module.exports.bindQueue = bindQueue;
