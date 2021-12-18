const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Returns the server name and member count'),
	async execute(interaction) {
    // console.log(interaction.member)
		await interaction.reply(`This is the ${interaction.member.guild.name} server\nUsers: ${interaction.member.guild.memberCount}`);
	},
};
