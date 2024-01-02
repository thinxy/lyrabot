import { client } from "@/index";
import { Event } from "@/discord/base/structure/types/Event";

export default new Event({
	name: "messageCreate",
	async run(message) {
		if (!message.inGuild() || message.author.bot) return;
		const prefix = "a?";

		if (!message?.content.toLowerCase().startsWith(prefix)) return;

		let args = message?.content.slice(prefix.length).trim().split(/ +/g),
			cmd = args.shift()!.toLowerCase();
		if (cmd?.length === 0) return;

		let command = client.MessageCommands.get(cmd);
		if (!command)
			command = client.MessageCommands.get(client.aliases.get(cmd)!);

		if (command)
			try {
				command.run({ client, message, args });
			} catch (err) {
				console.error(
					`❌ | An error ocurred while trying to run the Message Commands (/): \n${err}`
				);
			}
	},
});
