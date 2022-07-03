const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
console.log('Handler Good')
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
    
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/Commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });

    client.on("ready", async () => {
        // Register for a single guild
        await client.guilds.cache
            .get("937339730067071006")
            .commands.set(arrayOfSlashCommands);

        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands);
    });

    // Buttons
    const buttons = await globPromise(
        `${process.cwd()}/SlashCommands/Buttons/*/*.js`
    )
    buttons.map((value) => {
        const file = require(value);
        client.slashCommandButtons.set(file.id, file);
    });

    // Select Menus
    const menus = await globPromise(
        `${process.cwd()}/SlashCommands/Menus/info/select.js`
    );
    menus.map((value) => {
        const file = require(value);
        client.slashCommandMenus.set(file.id, file);
    });
};
