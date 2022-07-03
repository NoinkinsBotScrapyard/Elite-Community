const { Client, CommandInteraction, MessageButton, MessageActionRow } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "unban",
    description: "Unban a member",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "user",
        description: "The user to unban",
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
          let memberTarget = interaction.guild.ban.fetch(user.id);
          memberTarget.unban()
          try {
          let sendToChannel = member.guild.channels.cache.find(channel => channel.name === 'logs')
          if(!sendToChannel) return;
          member.guild.channels.cache.find(channel => channel.name === '🤨︱punishment-log').send({ content: `${user} has been unbanned by ${interaction.author}` })
          } catch(err) {}
          await interaction.followUp({ content: `${user} has been banned!` })
        } else {
          interaction.followUp({ content: "You can not use this command." })
        }
    },
};
