const { cmd } = require('../command');

cmd({
  pattern: "moon",
  react: "🌙",
  desc: "moon massage",
  category: "other",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const replies = [
      "*KING - MS 𝙰𝙸*", // massage  add කරන්න "put your massage hera",
      "LODING...",
      "🌕",
      "🌔",
      "🌓",
      "🌒",
      "🌑", 
      "🌒",
      "🌓",
      "🌔",
      "🌕",
      "🌔",
      "🌓",
      "🌒",
      "🌚",
      "🌒",
      "🌓",
      "🌔",
      "🌝",
      "🌜",
      "🌓",
      "🌛", 
      "🌚",
      "🌙"
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