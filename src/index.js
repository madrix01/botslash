const {Client, Intents} = require("discord.js");
const dotenv = require("dotenv").config()

const Token = process.env.TOKEN

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.once("ready", () => {
	console.log("Botslash up and running")
})


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

client.login(Token)
