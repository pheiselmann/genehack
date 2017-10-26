// Import user mongoose model and express router
const {User} = require('./models');
const {router} = require('./router');

// Export user mongoose model and express router
module.exports = {User, router};