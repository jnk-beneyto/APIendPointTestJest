const express = require('express');
const router = express.Router();

const {
    User
} = require('../models');

router.get('/', async function (req, res) {
    const users = await User.find();
    res.send({
        status: 200,
        message: users
    });
    res.end();
});

router.get('/userId/:id', async function (req, res) {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        res.send({
            status: 404,
            message: "user not found!"
        })
    }
    res.send({
        status: 200,
        message: user
    });
    res.end();
});

router.delete('/userId/:id', async function (req, res) {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        res.send({
            status: 404,
            message: "user not found!"
        })
    }
    res.send({
        status: 200,
        message: "user deleted!"
    });
    res.end();
});

router.put('/userId/:id', async function (req, res) {
    const id = req.params.id;
    const body = req.body;
    if (!id || !body) return res.send({
        status: 400,
        message: "data missing"
    }).end();

    const userUpdated = await User.findByIdAndUpdate(id, body, {
        new: true
    }, (err) => {
        if (err) {
            res.send({
                status: 404,
                message: "user not found"
            }).end();
        }
    });
    if (!userUpdated) {
        res.send({
            status: 500,
            message: "Server error"
        }).end();
    }
    res.send({
        status: 200,
        message: userUpdated
    }).end();

});

router.post('/', async function (req, res) {

    const {
        name,
        email,
        pwd
    } = req.body;

    if (!name || !email || !pwd) return res.send({
        status: 400,
        message: "data missing"
    }).end();
    const user = new User({
        name,
        email,
        pwd
    })
    const newUser = await user.save()
    if (!newUser) {
        res.send({
            status: 500,
            message: "Server error"
        }).end();
    }
    res.send({
        status: 200,
        message: newUser
    }).end();
});

module.exports = router;