const { cmd } = require('../command');

cmd({
  pattern: "ping",
  react: "🏓",
  desc: "Check bot response speed",
  category: "general",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  const start = new Date().getTime();

  await conn.sendMessage(m.chat, { text: "```Testing Ping ⚡...```" }, { quoted: mek });

  const end = new Date().getTime();
  const speed = end - start;

  await reply(`🏓 *Pong!*\n💡 Speed: ${speed}ms\n>ᴋɪɴɢ-ᴍꜱ`);
});
