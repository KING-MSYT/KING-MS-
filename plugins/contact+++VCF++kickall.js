const fs = require('fs');
const { cmd } = require('../command'); // ඔබේ බොට් system එකට හොඳ compatible කරනවා

cmd({
  pattern: 'getcontact',
  desc: 'Get group contacts as .vcf file',
  category: 'tools',
  filename: __filename
}, async (conn, m, mData, { isGroup, participants, groupMetadata, reply }) => {

  if (!isGroup) return reply("⛔ මෙය group එකක පමණක් භාවිතා කළ හැක.");
  if (!participants || participants.length === 0) return reply("❌ group එකේ members ලැබෙන්නේ නැහැ.");

  reply("📥 Members info එක ගන්නවා...");

  const groupName = groupMetadata.subject || "Group";
  let vcfData = "";

  for (let p of participants) {
    const num = p.id.split("@")[0];
    vcfData += `BEGIN:VCARD\nVERSION:3.0\nFN:+${num}\nTEL;type=CELL:+${num}\nEND:VCARD\n\n`;
  }

  const fileName = `/mnt/data/${groupName.replace(/[^a-zA-Z0-9]/g, "_")}.vcf`;
  fs.writeFileSync(fileName, vcfData);

  await conn.sendMessage(m.chat, {
    document: { url: fileName },
    fileName: `${groupName}.vcf`,
    mimetype: 'text/x-vcard',
    caption: `📇 ${participants.length} contact එකක් export කරා ✅`
  }, { quoted: m });

});

/////////////////////////////////////////////////////////////


const path = require('path');

cmd({
  pattern: "sendmsgvcf",
  desc: "Send message to contacts in vCard file",
  category: "owner",
  filename: __filename,
  use: "<message>"
}, async (conn, m, mdata, { args, quoted, reply }) => {
  if (!quoted || quoted.mimetype !== 'text/vcard') return reply('❌ Reply to a VCF file.');
  if (!args[0]) return reply('❌ Enter the message to send: `.sendmsgvcf <your message>`');

  let vcard = quoted.body;
  let message = args.join(" ");
  
  // Extract phone numbers from the vCard
  const numbers = [...vcard.matchAll(/TEL.*:(\+?\d{10,})/g)].map(m => m[1]);

  if (numbers.length === 0) return reply("❌ No valid numbers found in the vCard!");

  reply(`📤 Sending message to ${numbers.length} contact(s)...`);

  for (let number of numbers) {
    const jid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await conn.sendMessage(jid, { text: message }).catch(e => {
      console.log(`Failed to send to ${number}:`, e.message);
    });
    await new Promise(r => setTimeout(r, 200)); // Delay to prevent rate limits
  }

  reply('✅ Message sent to all contacts in the VCF!');
});
