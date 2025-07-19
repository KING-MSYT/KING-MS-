const { cmd } = require('../command');

cmd({
  pattern: "ping",
  react: "🏓",
  desc: "Check bot response speed (edited reply)",
  category: "general",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  const start = new Date().getTime();

  const msg = await conn.sendMessage(m.chat, { text: "```Testing Ping ⚡...```" }, { quoted: mek });

  const end = new Date().getTime();
  const speed = end - start;

  await conn.sendMessage(m.chat, {
    text: `🏓 *Pong!*\n💡 Speed: ${speed}ms\n>ᴋɪɴɢ-ᴍꜱ`,
    edit: msg.key
  });
});
