const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calendar')
		.setDescription('Returns the next 10 events on the Backend calendar'),
	async execute(interaction) {
		const calendar = 'Calendar'
		await interaction.reply(`${calendar}`);
	},
};
