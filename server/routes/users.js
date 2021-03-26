const { coreGetUsersFromFiles, coreAddUsersFromAPI } = require('../core/users');
const { validateGetUsers, validateAddUsers } = require('../utils/validateUsersUtils');
const express = require('express');
const router = express.Router();

// Get all users.
router.get('/getUsers', async (req, res) => {

    // Validate the from and the top parameters.
    const validateResult = validateGetUsers(req);
    if (validateResult) {
        return res.status(400).send(validateResult);
    }

    const users = await coreGetUsersFromFiles(req.query.pageNumber, req.query.top);
    return res.status(200).send(users);
});

// Add users to the list and push notification.
router.post('/addUsers', async (req, res) => {

    // Validate the request.
    const validateResult = validateAddUsers(req);
    if (validateResult) {
        return res.status(400).send(validateResult);
    }

    const users = await coreAddUsersFromAPI(req.body);

    const io = req.app.get('socketio');
    io.emit('newUsers', users);

    return res.status(200).send(users);
});

module.exports = router;