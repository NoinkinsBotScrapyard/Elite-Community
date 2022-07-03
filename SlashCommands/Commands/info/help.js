const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Lists all commands",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const help = new MessageEmbed()
			  .setColor('#0099ff')
			  .setTitle('Elite Community Commands')
			  .setDescription('**Normal Commands:**\n\n/help\n/ping\n\n**Admin Commands:**\n\n/ban\n/unban\n/mute(coming soon)\n/unmute(coming soon)\n/warn(coming soon)\n/kick')
		interaction.followUp({ embeds: [help] })
    },
};
