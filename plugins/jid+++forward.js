const { cmd } = require('../command');

cmd({
  pattern: "jid",
  react: "🆔",
  desc: "Get current chat's JID",
  category: "general",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  let jidInfo = `╭───⪩ *🆔 JID INFO*\n│\n`;

  // sender JID (always available)
  jidInfo += `│ 👤 Sender JID: *${m.sender}*\n`;

  // chat JID (group / private / channel)
  jidInfo += `│ 💬 Chat JID: *${m.chat}*\n`;

  // if group
  if (m.chat.endsWith('@g.us')) {
    jidInfo += `│ 👥 Group Detected\n`;
  } else if (m.chat.endsWith('@s.whatsapp.net')) {
    jidInfo += `│ 👤 Private Chat Detected\n`;
  } else if (m.chat.endsWith('@broadcast')) {
    jidInfo += `│ 📢 Channel Detected\n`;
  } else {
    jidInfo += `│ ⚠️ Unknown Chat Type\n`;
  }

  jidInfo += `╰────────────⪨`;

  await reply(jidInfo);
});


// forward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MSforward.js⏤KING-MS



cmd({
  pattern: "forward",
  react: "📨",
  desc: "Forward a replied message to given JID",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
  if (!isOwner) return reply("Owner only!");

  const targetJid = args[0];
  if (!targetJid || !targetJid.includes('@')) {
    return reply("ඇතුලත් කරන්න valid JID එකක්:\n.eg: `.forward 94712345678@s.whatsapp.net`");
  }

  if (!m.quoted) return reply("කරුණාකර forward කරන්න message එකකට reply කරන්න 📨");

  try {
    const msgContent = await m.getQuotedObj();
    const fwdContent = await conn.serializeM(msgContent);

    await conn.copyNForward(targetJid, fwdContent, true);

    reply("✅ Message forwarded successfully!");
  } catch (err) {
    console.error("Forward Error:", err);
    reply("❌ Forward කරද්දි error එකක් ආව!");
  }
});
