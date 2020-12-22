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

    amqpClient.sendMessage(JSON.stringify(newUser), "RequestAccountCreate", null).then(msg => {
        if (msg.properties.headers.status_code === 200) {
            const result = msg.content.toString();
            var json = JSON.parse(result);
            //{"status_code":200,"data":{"user_email":"hej@hej.dk","role":"0","updated_at":"2020-12-21 03:26:16","last_login":"2020-12-21 03:26:16","jwt":"merp","created_at":"2020-12-21 03:23:46","username":"hej"},"message":"token created"}
            res.status(201).json({user: json});
        } else {
            res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
    });
});

router.get('/:id', function (req, res) {
    //RequestAccountData
    const payload = {user_id: req.params['id']}
    amqpClient.sendMessage(JSON.stringify(payload), "RequestAccountData", {}).then(msg => {
        const result = msg.content.toString() ? JSON.parse(msg.content.toString()) : {};
        res.json({result, username: payload.user_id}); // User ID should instead be the users real name (need implementation in authentication service)
    });
});
router.put('/:id', validJWT, function (req, res) {
    //UpdateAccount
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "UpdateAccount", token).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});
router.delete('/:id', validJWT, function (req, res) {
    //RequestAccountDelete
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    const payload = {
        user_id: req.params['id']
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RequestAccountDelete", token).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});

router.put('/admin/:id', validJWT, function (req, res) {
    //UpdateAccountPrivileges
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    const payload = {
        user_id: req.params['id'],
        new_role: req.body.new_role
    }
    amqpClient.sendMessage(JSON.stringify(payload), "UpdateAccountPrivileges", token).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});

router.put('/admin/ban/:id', validJWT, function (req, res) {
    //RequestBanUser
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    const payload = {
        user_id: req.params['id'],
        permanent: req.body.permanent
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RequestBanUser", token).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});
router.put('/admin/flag/:id', validJWT, function (req, res) {
    //RequestFlagUser
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    const payload = {
        user_id: req.params['id']
    }
    amqpClient.sendMessage(JSON.stringify(payload), "RequestFlagUser", token).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});
router.get('/admin/flag', validJWT, function (req, res) {
    //RequestAllFlagged
    var token = {
        "jwt": req.cookies["_auth_t"]
    }
    amqpClient.sendMessage(JSON.stringify(req.body), "RequestAllFlagged", token).then(msg => {
        if(msg.properties.headers.status_code !== 200) {
            return res.status(msg.properties.headers.status_code).send(msg.properties.headers.message);
        }
        const result = JSON.parse(msg.content.toString());
        res.json(result);
    });
});
router.get('/:id/posts', maybeJWT, function (req, res) {
    amqpClient.sendMessage(JSON.stringify({"author_id": req.params.id}), "RequestUserPosts", null).then(msg => {
        msgJson = JSON.parse(msg.content.toString());
        res.status(200).json(msgJson);
    });
});

module.exports = router;