const { getEnvironment } = require('../utils/coreUtils.js');

export default require(`./settings.${getEnvironment()}.json`);