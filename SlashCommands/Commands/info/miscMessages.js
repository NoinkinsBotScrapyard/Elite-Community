const { Client, CommandInteraction, MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "misc",
    description: "Messages like verify",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "verify",
            description: "Verify message",
            type: 1
        },
		{
			name: "rules",
			description: "Rules message",
			type: 1
		}
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `You do not have permission to do this command.` })
        if (interaction.options.getSubcommand() === 'verify') {
            const verify = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('verify')
					.setLabel('Verify!')
					.setStyle('SUCCESS')
                    .setEmoji('✅'),
			);
            await interaction.followUp({ content: `Verify message will be below, please delete this message` })
            interaction.channel.send({ content: `Click the button below to verify`, components: [ verify ]})
        } else if(interaction.options.getSubcommand() === 'rules' ) {
			const rules = new MessageEmbed()
			  .setColor('#0099ff')
			  .setTitle('Elite Community Rules')
			  .setDescription('**Rule 1.** No racist, homophobic or religious topics, when talking throughout the server do not bring up or joke about sensitive topics such as race sexualities and beliefs.\n\n**Rule 2.** You may curse throughout the server but to keep the community a fun environment you may not curse at staff or members.\n\n**Rule 3.** No excessive cursing.\n\n**Rule 4.** Do not @everyone or @here without permission from the owners.\n\n**Rule 5.** Inviting bots is NOT ALLOWED without the owner or co owners approval, any bots that are found will be INSTANTLY BANNED. \n\n**Rule 6.** No advertising in the server outside the advertising channel,  if you do advertise in the server outside of the advertising channel, we will assume you are just here to advertise/troll and you will be BANNED from the discord server.\n\n**Rule 7.** No offense names or profile pictures if you have an offensive name of profile picture you will be asked to change it if you do not comply you will be removed from the server.\n\n**Rule 8.** Respect staff when talking throughout our discord server respect our staff team treat others the way you would want to be treated.\n\n**Rule 9.** ALL STAFF DECISIONS ARE FINAL! So do not argue with our staff team if you think their decision is unfair or unjust, please dm the owner or co owner and we will look into it.\n\n**Rule 10.** Have fun!')
			interaction.followUp('Delete this message, the rules will be after')
			interaction.channel.send({ embeds: [rules] })
		}
    },
};
