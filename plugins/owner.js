const { cmd } = require('../command');

cmd({
  pattern: "owner",
  react: "👨‍💻",
  desc: "for get owner nomber",
  category: "other",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const replies = [
      "*KING - MS* OWNER IS KING *Ꮇᴀꜰɪᴀ*", // massage  add කරන්න "put your massage hera",
      "SENDING OWNER NOMBER...",
      "KING - MS WATSAPP BOT 👨‍💻",
      "https://wa.me/+94767861594?text=HELLO👋+KING+-+MS OWNER",



    ];

    // පළමු message එක යවන්න
    let sent = await conn.sendMessage(from, { text: replies[0] }, { quoted: m });

    for (let i = 1; i < replies.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s delay

      // Edit message content
      await conn.sendMessage(from, {
        edit: sent.key,
        text: replies[i]
      });
    }

  } catch (err) {
    console.error(err);
    reply("Error while simulating edited owner message.");
  }
});
