const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "WN8ySKgY#Y0ncnp_K_eZddQHkMN6tfiMvfeOyluSZ9TkYgYsdT2o",
};
