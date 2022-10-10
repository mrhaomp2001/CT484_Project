const auth  = require('./auth.routes')
const users = require('./users.routes')
const image = require('./image.routes');


module.exports = {
    auth,
    users,
    image,
}