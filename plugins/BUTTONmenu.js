const { cmd } = require('../command');

cmd({
  pattern: "menu",
  react: "📜",
  desc: "Show all commands with buttons",
  category: "general",
  filename: __filename
}, async (conn, mek, m, { prefix }) => {

  const text = `👋 Hello *${m.pushName || "User"}*,

🛠️ *KING-MS BOT MENU*

📌 Available Commands:
  ▸ .ping
  ▸ .getpp
  ▸ .callspam
  ▸ .alive
  ▸ .owner
  ▸ .boom

🔘 Choose a quick option below:`;

  const buttons = [
    {
      buttonId: `${prefix}ping`,
      buttonText: { displayText: '📶 Ping' },
      type: 1
    },
    {
      buttonId: `${prefix}alive`,
      buttonText: { displayText: '💡 Alive' },
      type: 1
    },
    {
      buttonId: `${prefix}owner`,
      buttonText: { displayText: '👑 Owner' },
      type: 1
    }
  ];

  await conn.sendMessage(m.chat, {
    text: text,
    footer: '🤖 KING-MS BOT by Ꮇᴀꜰɪᴀ',
    buttons: buttons,
    headerType: 1
  }, { quoted: mek });

});
