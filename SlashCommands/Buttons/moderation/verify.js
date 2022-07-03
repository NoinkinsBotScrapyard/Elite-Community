const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    id: "verify",
    run: async (client, interaction, args) => {
        const target = interaction.guild.members.cache.get(interaction.user.id);
        const memberTarget = interaction.guild.members.cache.get(target.id)
        let verifiedRole = interaction.guild.roles.cache.find(role => role.name === 'Members');
        memberTarget.roles.add(verifiedRole)
        await interaction.reply({ ephemeral: true, content: `Verified! Welcome to the community!`})
    },
};
