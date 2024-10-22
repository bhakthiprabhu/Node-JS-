const crypto = require('crypto');

module.exports = () => {
    // Generate a random ID with length 24
    return crypto.randomBytes(12).toString('hex'); // 12 bytes for 24 hex characters
}