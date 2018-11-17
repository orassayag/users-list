const { getUsersFromFiles } = require('../api/api');
const { createUsersFromJsons, createUsersFromAPI } = require('../models/User');
const { CacheService } = require('../utils/CacheService');

const ttl = 60 * 60 * 1; // Cache for 1 hour.
const cache = new CacheService(ttl); // Create a new cache service instance.

// Get users from json files (Or from cache if already exists).
const coreGetUsersFromFiles = (pageNumber, top) => {
    // Check for the users in the cache. If not exists, pull from json files and store in the cache for the next load.
    let users = loadUsers();
    --pageNumber; // because pages logically start with 1, but technically with 0
    users = users.slice(pageNumber * top, (pageNumber + 1) * top);
    return users;
};

// Get users from API call.
const coreAddUsersFromAPI = (data) => {
    // Check for the users in the cache. If not exists, pull from json files and store in the cache for the next load.
    const users = loadUsers();
    const newUsers = createUsersFromAPI(data);
    cache.set('users', [
        ...users,
        ...newUsers
    ]);
    return newUsers;
};

const loadUsers = () => {
    // Check for the users in the cache. If not exists, pull from json files and store in the cache for the next load.
    let users = cache.get('users');
    if (!users) {
        const usersJsonData = getUsersFromFiles();
        users = createUsersFromJsons(usersJsonData.usersData.users, usersJsonData.usersNamesData.users);
        cache.set('users', users);
    }
    return users;
};

module.exports = {
    coreGetUsersFromFiles: coreGetUsersFromFiles,
    coreAddUsersFromAPI: coreAddUsersFromAPI
};