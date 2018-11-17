// Get all users from external json files.
const getUsersFromFiles = () => {
    // Load all data from json files.
    const usersData = require('../data/users.json');
    const usersNamesData = require('../data/userNames.json');

    return {
        usersData: usersData,
        usersNamesData: usersNamesData
    };
};

module.exports.getUsersFromFiles = getUsersFromFiles;