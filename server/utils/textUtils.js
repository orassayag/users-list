const addCommasToNumber = (number) => {
    if (!number) {
        return;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

module.exports = {
    addCommasToNumber:addCommasToNumber
};