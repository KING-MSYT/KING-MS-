const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');

cmd({
  pattern: "getpp",
  react: "🪀",
  desc: "Get profile picture from WhatsApp",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
  try {
    if (!isOwner) return reply("Owner only!");

    const number = args[0]?.replace(/[^0-9]/g, '');
    if (!number) return reply("ඇතුලත් කරන්න: *getpp 947XXXXXXXX*");

    const jid = number + "@s.whatsapp.net";

    let ppUrl;
    try {
      ppUrl = await conn.profilePictureUrl(jid, 'image');
    } catch (e) {
      return reply("PP not found or privacy restricted.");
    }

    const response = await axios.get(ppUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `*• KING-MS AI •*\nProfile picture of ${number}`
    }, { quoted: mek });

  } catch (err) {
    console.error("getpp error:", err);
    reply("Error getting profile picture.");
  }
});
