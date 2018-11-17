const validateGetUsers = (req) => {
    // Validate from and top parameters.
    if (!req.query.pageNumber || !req.query.top) {
        return 'Missing pageNumber or top parameters';
    }

    const pageNumber = Number(req.query.pageNumber);
    const top = Number(req.query.top);

    if (isNaN(pageNumber) || isNaN(top)) {
        return 'Invalid pageNumber or top parameters';
    }

    return null;
};

const validateAddUsers = (req) => {
    // Validate body.
    if (!req.body) {
        return 'Missing body';
    }

    if (!req.body.users) {
        return 'Body is empty';
    }

    return null;
};

module.exports = {
    validateGetUsers: validateGetUsers,
    validateAddUsers: validateAddUsers
};