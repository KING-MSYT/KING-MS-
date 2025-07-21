const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "iAk3kZRT#ttfyA9nLn6HNaWRP3GpLfCRa8frTuwNDBc7A2veShFM",
};
