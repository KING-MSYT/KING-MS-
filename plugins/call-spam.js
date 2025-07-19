const { cmd } = require('../command');

cmd({
  pattern: "callspam",
  react: "📞",
  desc: "Spam missed calls to a number (Owner Only)",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
  if (!isOwner) return reply("Owner only command!");

  const number = args[0]?.replace(/[^0-9]/g, '');
  const count = parseInt(args[1]);

  if (!number || !count) {
    return reply("ඇතුලත් කරන්න:\n.callspam 94XXXXXXXX 10");
  }

  const jid = number + "@s.whatsapp.net";

  reply(`📞 Calling ${number} - ${count} times...`);

  for (let i = 1; i <= count; i++) {
    try {
      await conn.sendPresenceUpdate('available', jid); // fake presence
      await conn.ws.sendNode({
        tag: 'call',
        attrs: { to: jid, id: conn.generateMessageTag(), type: 'terminate' }, // not real call
        content: [{
          tag: 'offer',
          attrs: {
            call-id: conn.generateMessageTag(),
            sdp: 'fake-sdp',
            creator: 'offerer'
          },
          content: []
        }]
      });

      await reply(`📲 ${i}/${count} Call sent to ${number}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 sec pause
    } catch (e) {
      console.error("Call error:", e);
      await reply(`❌ Failed to call at ${i} time`);
    }
  }

  reply("✅ Done call spam.\nᴘᴏᴡᴇʀᴅ ʙʏ *ᴋɪɴɢ-ᴍꜱ* ");
});
