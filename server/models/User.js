const winston = require('winston');
const { addCommasToNumber } = require('../utils/textUtils');

class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.position = user.position;
        this.monthlySlary = user.monthlySlary;
    }
}

// Validate the user basic parameters.
const validateUser = (userData, i) => {

    if (!userData) {
        return `User index ${i} - User object is missing.`;
    }

    // Validate id.
    if (!userData.id) {
        return `User index ${i} - User id is missing.`;
    }

    const userId = Number(userData.id);
    if (isNaN(userId)) {
        return `User index ${i} - Invalid user id parameter (Not a number).`;
    }

    // Validate position.
    if (!userData.position) {
        return `User index ${i} - User position is missing.`;
    }

    const userPosition = userData.position.trim();
    if (userPosition.length > 100) {
        return `User index ${i} - User position exceeds the maximum of 100 characters.`;
    }

    if (userPosition.length < 5) {
        return `User index ${i} - User position less than the minimum of 5 characters.`;
    }

    // Validate monthlySlary.
    if (!userData.monthlySlary) {
        return `User index ${i} - User monthlySlary is missing.`;
    }

    const userMonthlySlary = Number(userData.monthlySlary);
    if (isNaN(userMonthlySlary)) {
        return `User index ${i} - Invalid user monthlySlary parameter (Not a number).`;
    }

    return null;
};

// Validate the user name parameter.
const validateUserName = (userNameData, i) => {

    // Validate name.
    if (!userNameData) {
        return `User index ${i} - User name object is missing.`;
    }

    if (!userNameData.name) {
        return `User index ${i} - User name is missing.`;
    }

    const userName = userNameData.name.trim();
    if (userName.length > 100) {
        return `User index ${i} - User name exceeds the maximum of 100 characters.`;
    }

    if (userName.length < 5) {
        return `User index ${i} - User name is under the minimum of 5 characters.`;
    }

    return null;
};

// Create users from array of users data and array of users names from external json files.
const createUsersFromJsons = (users, usersNames) => {

    // Validate parameters.
    if (!users || !usersNames || users.length <= 0 || usersNames.length <= 0) {
        return null;
    }

    const usersList = [];

    // Loop on all users data;
    for (let i = 0; i < users.length; i++) {

        // Validate user basic data.
        const userData = users[i];
        const validateUserErrorMessage = validateUser(userData, i);
        if (validateUserErrorMessage) {
            winston.error(validateUserErrorMessage);
            continue;
        }

        // Validate user name.
        const userNameData = usersNames.find(u => u.id === userData.id);
        const validateUserNameErrorMessage = validateUserName(userNameData);
        if (validateUserNameErrorMessage) {
            winston.error(validateUserNameErrorMessage);
            continue;
        }

        // Push the user into the array.
        usersList.push(new User({
            id: userData.id,
            name: userNameData.name,
            position: userData.position,
            monthlySlary: addCommasToNumber(userData.monthlySlary)
        }));
    }
    return usersList;
};

// Create users from array of users data and array of users names from API call.
const createUsersFromAPI = (data) => {
    debugger;

    // Validate parameters.
    if (!data || data.users.length <= 0) {
        return null;
    }

    const usersList = [];

    // Loop on all users data;
    for (let i = 0; i < data.users.length; i++) {

        // Validate user basic data.
        const userData = data.users[i];
        const validateUserErrorMessage = validateUser(userData, i);
        if (validateUserErrorMessage) {
            winston.error(validateUserErrorMessage);
            continue;
        }

        // Validate user name.
        const validateUserNameErrorMessage = validateUserName(userData);
        if (validateUserNameErrorMessage) {
            winston.error(validateUserNameErrorMessage);
            continue;
        }

        // Push the user into the array.
        usersList.push(new User({
            id: userData.id,
            name: userData.name,
            position: userData.position,
            monthlySlary: addCommasToNumber(userData.monthlySlary)
        }));
    }
    return usersList;
};

module.exports = {
    createUsersFromJsons: createUsersFromJsons,
    createUsersFromAPI: createUsersFromAPI
};