const keepAlive = require("./server.js")
const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.slashCommandButtons = new Collection();
client.slashCommandMenus = new Collection();

keepAlive()

// Initializing the project
require("./handler")(client);

client.login(process.env["TOKEN"]);