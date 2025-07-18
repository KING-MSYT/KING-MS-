const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "Pw4y2IgY#bdSSQtp0S5YoWg6ToYOsOGipm84owVPBJVLjruex19o",
};
