const { cmd } = require('../command');

cmd({
  pattern: "callspam",
  react: "📞",
  desc: "Spam missed calls to a number (Owner Only)",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {

  if (!isOwner) return reply("❌ Owner only command!");

  const number = args[0]?.replace(/[^0-9]/g, '');
  const count = parseInt(args[1]);

  if (!number || isNaN(count)) {
    return reply("🙃 ඇතුලත් කරන්න:\n.callspam 94XXXXXXXX 10");
  }

  const jid = number + "@s.whatsapp.net";
  const callId = conn.generateMessageTag();

  reply(`📞 Calling ${number} - ${count} times...`);

  for (let i = 1; i <= count; i++) {
    try {
      await conn.ev.emit('call', {
        tag: 'call',
        attrs: {
          from: conn.user.id,
          to: jid,
          id: conn.generateMessageTag(),
          type: 'offer'
        },
        content: [{
          tag: 'offer',
          attrs: {
            'call-id': callId,
            'sdp': 'v=0\r\no=- 0 0 IN IP4 127.0.0.1\r\ns=-\r\nc=IN IP4 127.0.0.1\r\nt=0 0\r\nm=audio 9 RTP/AVP 0\r\n',
            'creator': 'offerer'
          },
          content: []
        }]
      });

      await reply(`📲 ${i}/${count} call sent to ${number}`);
      await new Promise(res => setTimeout(res, 2000)); // delay 2 seconds
    } catch (e) {
      console.error("❌ Call error:", e);
      await reply(`❌ Failed to call at ${i} time`);
    }
  }

  reply("✅ Done call spam.\nᴘᴏᴡᴇʀᴅ ʙʏ *ᴋɪɴɢ-ᴍꜱ*");
});
