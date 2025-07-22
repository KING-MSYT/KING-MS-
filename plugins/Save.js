const { cmd } = require('../command');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

cmd({
  pattern: "save",
  react: "💾",
  desc: "Save replied status to chat",
  category: "general",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!m.quoted) return reply("📌 Reply to a status message to save it.");

  try {
    const quoted = await m.getQuotedObj();
    const mime = (quoted.msg || quoted).mimetype || '';

    if (!mime) return reply("❌ This message doesn't contain any media.");

    const media = await downloadMediaMessage(quoted, 'buffer', {}, {
      logger: conn.logger,
      reuploadRequest: conn.updateMediaMessage
    });

    let type = mime.split('/')[0]; // image, video, audio etc.

    if (type === 'image') {
      await conn.sendMessage(m.chat, { image: media, caption: `💾 Saved from status!` }, { quoted: mek });
    } else if (type === 'video') {
      await conn.sendMessage(m.chat, { video: media, caption: `💾 Saved from status!` }, { quoted: mek });
    } else if (type === 'audio') {
      await conn.sendMessage(m.chat, { audio: media, mimetype: mime }, { quoted: mek });
    } else {
      await conn.sendMessage(m.chat, { document: media, mimetype: mime, fileName: "saved_file" }, { quoted: mek });
    }

  } catch (e) {
    console.error("Save error:", e);
    reply("❌ Error saving status.");
  }
});
