const client = require("../main");
const fs = require("fs")

client.on("messageCreate", async (message) => {
    fs.readFile(`${process.cwd()}/guildStuff/${message.guild.id}.json`, 'utf8', async function(err, data){
    var newData = JSON.parse(data)
    var prefix = newData.prefix
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
    });
});
