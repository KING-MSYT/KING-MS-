const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "LQkV0C5T#SA461DLpOaya-dYmlOJR6G3wH_oo4snCfsc7GuCb9h8",
};
