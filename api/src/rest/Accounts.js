const express = require("express");
const router = express.Router();
const {validJWT, maybeJWT} = require("../jwtAuth");
const amqpClient = require("../amqp/AmqpClient");

const {JWT_ENCODE, JWT_DECODE, TEST_USERS} = require("../mocking_data");

amqpClient.bindQueue(["ConfirmAccountCreation", "ReturnAccountInfo", "ConfirmAccountUpdate", "ConfirmAccountDeletion", "ConfirmBanUser", "ConfirmFlagUser", "ReturnAllFlagged"])

// Queue bindings
amqpClient.bindQueue(["ConfirmAccountCreation"]);

router.get('/', maybeJWT, function (req, res) {
    res.json(data)
});

// RequestAccountCreate // Request body contains this: `{username:<String>, email:<String>, password:<String>}`
router.post('/', function (req, res) {
    const newUser = {
        username: req.body.username,
        user_email: req.body.email,
        password: req.body.password,
        role: 0
    };
    console.log
    //const token = JWT_ENCODE({sub:"0", role:0, iss: "ImageHost.sdu.dk"});
    //TEST_USERS.push(newUser)
    //res.status(201).json({token, user:newUser});
    //return

    amqpClient.sendMessage(JSON.stringify(newUser), "RequestAccountCreate", null).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + result);
            var json = JSON.parse(result);
            //{"status_code":200,"data":{"user_email":"hej@hej.dk","role":"0","updated_at":"2020-12-21 03:26:16","last_login":"2020-12-21 03:26:16","jwt":"merp","created_at":"2020-12-21 03:23:46","username":"hej"},"message":"token created"}
            res.status(201).json({user: json});
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

router.get('/:id', maybeJWT, function (req, res) {
    //RequestAccountData
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "RequestAccountData", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + result);
            res.json(result);
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.put('/:id', validJWT, function (req, res) {
    //UpdateAccount
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "UpdateAccount", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + result);
            res.json(result);
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.delete('/:id', validJWT, function (req, res) {
    //RequestAccountDelete
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "RequestAccountDelete", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + result);
            res.json(result);
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

router.put('/admin/:id', validJWT, function (req, res) {
    //UpdateAccountPrivileges
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "UpdateAccountPrivileges", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + result);
            res.json(result);
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

router.put('/admin/ban', validJWT, function (req, res) {
    //RequestBanUser
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "RequestBanUser", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + result);
            res.json(result);
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.put('/admin/flag', validJWT, function (req, res) {
    //RequestFlagUser
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "RequestFlagUser", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + result);
            res.json(result);
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.get('/admin/flag', validJWT, function (req, res) {
    //RequestAllFlagged
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "RequestAllFlagged", token).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            console.log("Received " + result);
            res.json(result);
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});
router.get('/:id/posts', maybeJWT, function (req, res) {
    amqpClient.sendMessage(JSON.stringify({}), "RequestUserPosts", null).then(msg => {
        msgJson = JSON.parse(msg.content.toString());
        res.status(200).json(msgJson);
    });
});

module.exports = router;