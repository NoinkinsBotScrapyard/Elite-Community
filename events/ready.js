const client = require("../main");

client.on("ready", () => {
	console.log('Online');
	client.user.setActivity('Smileys Dream World', { type: 'WATCHING' });
});