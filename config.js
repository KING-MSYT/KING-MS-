const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "aRdwiYhA#NIqv6TgEdmeXqIucywY1_Z0j5oW2tC_uMgen7JycJlc",
};
