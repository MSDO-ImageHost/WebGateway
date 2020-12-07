const AMQP = require('amqplib');
const EventEmitter = require('events');
const { v4: uuid } = require('uuid');

// this queue name will be attached to "replyTo" property on producer's message,
// and the consumer will use it to know which queue to the response back to the producer
const REPLY_QUEUE = process.env.GATEWAY_QUEUE || "gateway-queue";

/**
 * Create AMQP channel and return back as a promise
 * @params {Object} setting
 * @params {String} setting.url
 * @returns {Promise} - return AMQP channel
 */
const createClient = (setting) => AMQP.connect(setting.url)
    .then(conn => {
        return conn.createChannel()
    }) // create channel
    .then(channel => {
        channel.assertQueue(REPLY_QUEUE, { durable: true });
        channel.responseEmitter = new EventEmitter();
        channel.responseEmitter.setMaxListeners(0);
        channel.consume(REPLY_QUEUE,
            msg => channel.responseEmitter.emit(msg.properties.correlationId, msg.content),
            { noAck: true });
        return channel;
    });

/**
 * Send RPC message to waiting queue and return promise object when
 * event has been emitted from the "consume" function
 * @params {Object} channel - AMQP channel
 * @params {String} message - message to send to consumer
 * @params {String} rpcQueue - name of the queue where message will be sent to
 * @returns {Promise} - return msg that send back from consumer
 */
const sendRPCMessage = (channel, message, rpcQueue) => new Promise(resolve => {
    const correlationId = uuid();
    channel.assertQueue(rpcQueue, { durable: true });
    channel.responseEmitter.once(correlationId, resolve);
    channel.sendToQueue(rpcQueue, Buffer.from(message), { correlationId, replyTo: REPLY_QUEUE });
});

module.exports.createClient = createClient;
module.exports.sendRPCMessage = sendRPCMessage;
