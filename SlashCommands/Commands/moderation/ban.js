const { Client, CommandInteraction, MessageButton, MessageActionRow } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "Ban a member",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "user",
        description: "The user to ban",
        type: "USER",
        required: true,
      },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('user')
        if (!interaction.member.permissions.has("BAN_MEMBERS")) { await interaction.followUp({ content: "You can not use this command." })} else if (interaction.member.permissions.has("BAN_MEMBERS")) {
          let memberTarget = interaction.guild.members.cache.get(user.id);
			if(interaction.user.roles <= user.roles) return interaction.followUp('Your role is not high enough.')
          memberTarget.ban()
          try {
          let sendToChannel = member.guild.channels.cache.find(channel => channel.name === 'logs')
          if(!sendToChannel) return;
          member.guild.channels.cache.find(channel => channel.name === '🤨︱punishment-log').send({ content: `${user} has banned by ${interaction.author}` })
          } catch(err) {}
          await interaction.followUp({ content: `${user} has been banned!` })
        } else {
          interaction.followUp({ content: "You can not use this command." })
        }
    },
};
