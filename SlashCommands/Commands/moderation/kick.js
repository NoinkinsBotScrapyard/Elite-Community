const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "kick",
    description: "Kick a member",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "user",
        description: "The user to kick",
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
        if (!interaction.member.permissions.has("KICK_MEMBERS")) { await interaction.followUp({ content: "You can not use this command." })} else if (interaction.member.permissions.has("BAN_MEMBERS")) {
          let memberTarget = interaction.guild.members.cache.get(user.id);
          memberTarget.kick()
          try {
          let sendToChannel = member.guild.channels.cache.find(channel => channel.name === 'logs')
          if(!sendToChannel) return;
          member.guild.channels.cache.find(channel => channel.name === '🤨︱punishment-log').send({ content: `${user} has kicked by ${interaction.author}` })
          } catch(err) {}
          await interaction.followUp({ content: `${user} has been kicked!` })
        } else {
          interaction.followUp({ content: "You can not use this command." })
        }
    },
}; 
