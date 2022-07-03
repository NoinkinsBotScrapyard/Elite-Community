const client = require("../main");
const { Message } = require('discord.js')

client.on('guildMemberAdd', async (member) => {
  try {
  let sendToChannel = member.guild.channels.cache.find(channel => channel.name === 'joins')
  if(!sendToChannel) return;
  member.guild.channels.cache.find(channel => channel.name === 'joins').send({ content: `${member} has joined the server!` })
  } catch(err) {
    console.error(err)
  }
})
