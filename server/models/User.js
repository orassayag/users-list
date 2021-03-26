const winston = require('winston');
const { addCommasToNumber } = require('../utils/textUtils');

class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.position = user.position;
        this.monthlySalary = user.monthlySalary;
    }
}

// Validate the user basic parameters.
const validateUser = (userData, i) => {

    if (!userData) {
        return `User index ${i} - User object is missing.`;
    }

    // Validate the Id.
    if (!userData.id) {
        return `User index ${i} - User Id is missing.`;
    }

    const userId = Number(userData.id);
    if (isNaN(userId)) {
        return `User index ${i} - Invalid user Id parameter (Not a number).`;
    }

    // Validate the position.
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

    // Validate the monthlySalary.
    if (!userData.monthlySalary) {
        return `User index ${i} - User monthlySalary is missing.`;
    }

    const userMonthlySalary = Number(userData.monthlySalary);
    if (isNaN(userMonthlySalary)) {
        return `User index ${i} - Invalid user monthlySalary parameter (Not a number).`;
    }

    return null;
};

// Validate the username parameter.
const validateUserName = (userNameData, i) => {

    // Validate the name.
    if (!userNameData) {
        return `User index ${i} - Username object is missing.`;
    }

    if (!userNameData.name) {
        return `User index ${i} - Username is missing.`;
    }

    const userName = userNameData.name.trim();
    if (userName.length > 100) {
        return `User index ${i} - Username exceeds the maximum of 100 characters.`;
    }

    if (userName.length < 5) {
        return `User index ${i} - Username is under the minimum of 5 characters.`;
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

        // Validate the username.
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
            monthlySalary: addCommasToNumber(userData.monthlySalary)
        }));
    }
    return usersList;
};

// Create users from array of users data and array of users names from API call.
const createUsersFromAPI = (data) => {

    // Validate parameters.
    if (!data || data.users.length <= 0) {
        return null;
    }

    const usersList = [];

    // Loop on all users data.
    for (let i = 0; i < data.users.length; i++) {

        // Validate user basic data.
        const userData = data.users[i];
        const validateUserErrorMessage = validateUser(userData, i);
        if (validateUserErrorMessage) {
            winston.error(validateUserErrorMessage);
            continue;
        }

        // Validate the username.
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
            monthlySalary: addCommasToNumber(userData.monthlySalary)
        }));
    }
    return usersList;
};

module.exports = {
    createUsersFromJsons: createUsersFromJsons,
    createUsersFromAPI: createUsersFromAPI
};