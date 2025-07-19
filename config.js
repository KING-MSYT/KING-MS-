const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "dUYACbzS#y6BQmny1wmhE33_pUo68Uy9ZVtzL4NfUwbuqBgnRecI",
};
