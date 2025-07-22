const { cmd } = require('../command');

cmd({
  pattern: "hack",
  react: "☠",
  desc: "Fake hacking with edited message",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const replies = [
      "LODING ○ ○ ○",
      "LODING ⦁ ○ ○",
      "LODING ⦁ ⦁  ○",
      "LODING ⦁ ⦁ ⦁",
      "LODING ✅",
      "⚠️ Warning ⚠️\n   ☠☠☠\n *Hacking Starting*",
      "⚠️ Hacking *Started* by  *Ꮇᴀꜰɪᴀ* ⚠️",
      "*All systems hacking starting...* 👨‍💻\n by KING MS BOT 👨‍💻",
      "Haking... ⚡ ⚡⚡\n```▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▉ █```",
      "Hacked by   0%  ⚡⚡⚡\n```▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒```",
      "Hacked by  10%  ⚡⚡⚡\n```█ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒```",
      "Hacked by  20%  ⚡⚡⚡\n```█ █ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒```",
      "Hacked by  30%  ⚡⚡⚡\n```█ █ █ ▒ ▒ ▒ ▒ ▒ ▒ ▒```",
      "Hacked by  40%  ⚡⚡⚡\n```█ █ █ █ ▒ ▒ ▒ ▒ ▒ ▒```",
      "Hacked by  50%  ⚡⚡⚡\n```█ █ █ █ █ ▒ ▒ ▒ ▒ ▒```",
      "Hacked by  60%  ⚡⚡⚡\n```█ █ █ █ █ █ ▒ ▒ ▒ ▒```",
      "Hacked by  70%  ⚡⚡⚡\n```█ █ █ █ █ █ █ ▒ ▒ ▒```",
      "Hacked by  80%  ⚡⚡⚡\n```█ █ █ █ █ █ █ █ ▒ ▒```",
      "Hacked by  90%  ⚡⚡⚡\n```█ █ █ █ █ █ █ █ █ ▒```",
      "Hacked by 100%  ⚡⚡⚡\n```█ █ █ █ █ █ █ █ █ █```",
      "*Tracking location...* 🇱🇰\n▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
      "*Tracking location...* 🇱🇰\n██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
      "*Tracking location...* 🇱🇰\n████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
      "*Tracking location...* 🇱🇰\n██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
      "*Tracking location...* 🇱🇰\n████████▒▒▒▒▒▒▒▒▒▒▒▒",
      "*Tracking location...* 🇱🇰\n██████████▒▒▒▒▒▒▒▒▒▒",
      "*Tracking location...* 🇱🇰\n████████████▒▒▒▒▒▒▒▒",
      "*Tracking location...* 🇱🇰\n██████████████▒▒▒▒▒▒",
      "*Tracking location...* 🇱🇰\n████████████████▒▒▒▒",
      "*Tracking location...* 🇱🇰\n██████████████████▒▒",
      "*Tracking location...* 🇱🇰\n████████████████████",   
      "*Location Tracked* ✅ 🇱🇰\nBy Ꮇᴀꜰɪᴀ",
      "```All Fils📂 Send To Ꮇᴀꜰɪᴀ and Bot Owner```",
      "Hacking By KING-MS Watsapp Bot\n⚡⚡⚡⚡⚡⚡",
      "*Mission complete*.\nAll systems hacked!✔",
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
    reply("Error while simulating edited hack message.");
  }
});
