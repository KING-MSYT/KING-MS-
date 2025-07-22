const { cmd } = require('../command');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

cmd({
  pattern: "vv",
  react: "🔓",
  desc: "Unlock view-once photo/video/voice",
  category: "general",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  if (!m.quoted) return reply("📌 View once msg එකකට reply කරන්න!");

  try {
    const quoted = await m.getQuotedObj();
    const msgType = Object.keys(quoted.message)[0];

    // Check view once
    const isViewOnce = quoted.message?.[msgType]?.viewOnce;

    if (!isViewOnce) return reply("❌ මෙක View Once msg එකක් නෙවෙයි!");

    const mime = quoted.message[msgType].mimetype || '';
    const media = await downloadMediaMessage(quoted, 'buffer', {}, {
      logger: conn.logger,
      reuploadRequest: conn.updateMediaMessage
    });

    if (mime.startsWith('image')) {
      await conn.sendMessage(m.chat, {
        image: media,
        caption: `🔓 Recovered View Once Photo`
      }, { quoted: mek });
    } else if (mime.startsWith('video')) {
      await conn.sendMessage(m.chat, {
        video: media,
        caption: `🔓 Recovered View Once Video`
      }, { quoted: mek });
    } else if (mime.startsWith('audio') || msgType === 'ptt') {
      await conn.sendMessage(m.chat, {
        audio: media,
        mimetype: mime,
        ptt: true
      }, { quoted: mek });
    } else {
      await conn.sendMessage(m.chat, {
        document: media,
        fileName: "recovered_file",
        mimetype: mime
      }, { quoted: mek });
    }

  } catch (e) {
    console.error("VV error:", e);
    reply("❌ View Once unlock failed!");
  }
});
