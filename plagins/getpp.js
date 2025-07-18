const { cmd } = require('../command');

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
    if (!number) return reply("ඇතුලත් කරන්න: *getpp 947XXXXXXXX*\n\n *+ ලකුන ඇතුලත් කරන්න එපා❌*");

    const jid = number + "@s.whatsapp.net";

    let ppUrl;
    try {
      ppUrl = await conn.profilePictureUrl(jid, 'image');
    } catch (e) {
      return reply("PP not found or privacy restricted.");
    }

    await conn.sendMessage(m.chat, {
      image: { url: ppUrl },
      caption: `*• KING-MS AI •*
      Profile picture of ${number}`
    }, { quoted: mek });

  } catch (err) {
    console.error("getpp error:", err);
    reply("Error getting profile picture.");
  }
});
