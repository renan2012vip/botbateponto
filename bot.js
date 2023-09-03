const Discord = require('discord.js');
const client = new Discord.Client();

// Configuração do bot
const TOKEN = 'MTE0NzQ0NjM1NzU2MTQ0MjQwOA.G77kEy.RbpDCocIYcVuIg7GdUmQVfCLqJYQQiWyYqb3Eo';
const PREFIX = '$';

// Dicionário para rastrear os registros de ponto dos usuários
const registrosDePonto = new Map();

client.once('ready', () => {
  console.log(`Bot está pronto como By Pulasky ${client.user.tag}`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'trabalhar') {
    if (!registrosDePonto.has(message.author.id)) {
      registrosDePonto.set(message.author.id, {
        inicio: new Date(),
        fim: null,
      });
      message.channel.send(`Registro de ponto iniciado para ${message.author}`);
    } else {
      message.channel.send(`${message.author}, seu registro de ponto já foi iniciado.`);
    }
  }

  if (command === 'finalizar') {
    if (registrosDePonto.has(message.author.id)) {
      const registro = registrosDePonto.get(message.author.id);
      registro.fim = new Date();
      const duracao = registro.fim - registro.inicio;
      message.channel.send(
        `${message.author}, registro de ponto encerrado. Início: ${registro.inicio}, Fim: ${registro.fim}, Duração: ${duracao / 1000} segundos`
      );
      registrosDePonto.delete(message.author.id);
    } else {
      message.channel.send(`${message.author}, você não iniciou o registro de ponto.`);
    }
  }
});

// Conecta o bot
client.login(TOKEN);
