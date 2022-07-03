const client = require("../main");
client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});


        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // Button Handling
    if (interaction.isButton()) {
        const button = client.slashCommandButtons.get(interaction.customId);
        if (!button) {
            return interaction.channel.send({ ephemeral: true, content: 'An error has occured' })
        }

        button.run(client, interaction)
    }

    // Select Menu Handling
    if (interaction.isSelectMenu()) {
        const menu = client.slashCommandMenus.get(interaction.customId);
        if (!menu) {
            return interaction.channel.send({ ephemeral: true, content: 'An error has occured' })
        }

        menu.run(client, interaction)
    }
});
