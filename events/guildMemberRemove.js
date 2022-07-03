const client = require("../main");
const { Message } = require('discord.js')

client.on('guildMemberRemove', async (member) => {
  try {
  let sendToChannel = member.guild.channels.cache.find(channel => channel.name === 'logs')
  if(!sendToChannel) return;
  member.guild.channels.cache.find(channel => channel.name === 'logs').send({ content: `${member} has left, been kicked or been banned!` })
  } catch(err) {
    console.error(err)
  }
})
