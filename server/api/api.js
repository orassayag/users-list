// Get all users from external JSON files.
const getUsersFromFiles = () => {
    // Load all data from JSON files.
    const usersData = require('../data/users.json');
    const usersNamesData = require('../data/userNames.json');

    return {
        usersData: usersData,
        usersNamesData: usersNamesData
    };
};

module.exports.getUsersFromFiles = getUsersFromFiles;