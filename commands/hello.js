const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Says Hello!'),
	async execute(interaction) {
    // console.log(interaction)
		await interaction.reply(`Hello, ${interaction.user.username}`);
	},
};
