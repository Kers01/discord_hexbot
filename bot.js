const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json'); // Bot tokeninizi config dosyasından alıyoruz
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const roleId = 'roleId'; // Onaylanacak role ID
const channelId = 'channelId'; // Mesajların izleneceği kanal ID

// Bot açıldığında
client.once('ready', () => {
  console.log(`Bot hazır! ${client.user.tag} olarak giriş yapıldı.`);
});

// Mesaj geldiğinde çalışacak
client.on('messageCreate', (message) => {
  // Bot kendi mesajlarına tepki vermemeli
  if (message.author.bot) return;

  // Sadece belirli kanaldaki mesajları kontrol et
  if (message.channel.id !== channelId) return;

  // Role sahip kişi kontrolü
  if (message.member && message.member.roles.cache.has(roleId)) {
    // Mesajı al ve komut formatında gönder
    const userId = message.author.id;
    const userMessage = message.content;

    // !wlekle komutunu oluştur
    const command = `!wlekle ${userMessage} <@${userId}>`;

    // Komutu yazdır
    message.channel.send(command);
  }
});

// Botu başlat
client.login(token);
