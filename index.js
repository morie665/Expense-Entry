// === Load Environment Variables ===
require('dotenv').config();

// === Imports ===
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// === Config ===
const TOKEN = process.env.TOKEN;
const SCRIPT_URL = process.env.SCRIPT_URL;
const SECRET = process.env.SECRET;

if (!TOKEN || !SCRIPT_URL || !SECRET) {
  console.error("❌ ERROR: Missing .env values!");
  process.exit(1);
}

// === Initialize Bot ===
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  
  const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');

  let results = [];
  let errors = [];

  // === Message Split === 
  for (const [index, line] of lines.entries()) {
    const parts = line.split('/');

    // Accept **4 or 5 parts**--->for with or without note
    if (parts.length < 4 || parts.length > 5) {
      errors.push(`❌ Baris ${index + 1}: "${line}"`);
      continue;
    }

    const [category, description, amountRaw, method, note = ""] = parts;

    const amountClean = amountRaw.replace(/[.,]/g, '');
    const amount = parseInt(amountClean, 10) || 0;

    try {
      const res = await axios.post(SCRIPT_URL, {
        secret: SECRET,
        category,
        description,
        amount,
        method,
        note,
      });

      if (res.data.ok) {
        results.push(
          `${index + 1}. ${category} - ${description} (${method})` +
          `: Rp ${amount.toLocaleString('id-ID')}`+
          (note ? ` 📝 ${note}` : "")
        );
      } else {
        errors.push(`⚠️ Baris ${index + 1} gagal simpan: ${res.data.error}`);
      }
    } catch (err) {
      errors.push(`⚠️ Baris ${index + 1} error: ${err.message}`);
    }
  }

// === Response if error ===
if (errors.length > 0) {
  const errorMsg =
    `⚠️ Beberapa baris salah atau gagal diproses:\n\n` +
    errors.join('\n') +
    `\n\nGunakan format:\nKategori/Deskripsi/Jumlah/Metode/Catatan (Opsional)`+
    `\n\nContoh format input ⬇️:\n`;

  const exampleMsg =
    `\nFood/Nasi Goreng/50000/Cash/makan pagi` +
    `\nTransport/Gojek/35,000/Gopay`+
    `\nEntertainment/Netflix/75.000/Bca/bulanan`;

  // Send error message first
  bot.sendMessage(chatId, errorMsg)
    .then(() => {
      // Then send example message
      bot.sendMessage(chatId, exampleMsg);
    });
}

// === Response if success ===
  if (results.length > 0) {
    const now = new Date();
    const date = now.toLocaleDateString('en-CA');
    const time = now.toLocaleTimeString('en-GB', { hour12: false });

    const successMsg =
      `✅ Data berhasil disimpan!\n📅 ${date} ⏰ ${time}\n\n` +
      results.join('\n');
    bot.sendMessage(chatId, successMsg);
  }
});

console.log('🤖 Bot is running...');