const validateGetUsers = (req) => {
    // Validate the from and the top parameters.
    if (!req.query.pageNumber || !req.query.top) {
        return 'Missing pageNumber or top parameters.';
    }

    const pageNumber = Number(req.query.pageNumber);
    const top = Number(req.query.top);

    if (isNaN(pageNumber) || isNaN(top)) {
        return 'Invalid pageNumber or top parameters.';
    }

    return null;
};

const validateAddUsers = (req) => {
    // Validate body.
    if (!req.body) {
        return 'Missing a body.';
    }

    if (!req.body.users) {
        return 'The body is empty.';
    }

    return null;
};

module.exports = {
    validateGetUsers: validateGetUsers,
    validateAddUsers: validateAddUsers
};