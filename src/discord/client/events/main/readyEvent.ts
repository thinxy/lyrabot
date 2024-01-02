import ms from "ms";
import { client } from "@/index";
import { Event } from "@/discord/base/structure/types/Event";
import { ActivityType } from "discord.js";

export default new Event({
	name: "ready",
	once: true,
	run: () => {
		const { SlashCommands, MessageCommands, buttons, selects, modals } =
			client;
		const commands = SlashCommands.size + MessageCommands.size;

		let names = ["Em atualizações."],
			stats = 0;

		setInterval(() => {
			client?.user?.setPresence({
				activities: [
					{
						name: names[stats++ % names.length],
						type: ActivityType.Playing,
					},
				],
				status: "online",
			});
		}, ms("60s"));

		console.log(
			`[APPLICATION] Successfully connected to the Discord API.`.green
		);
		console.log(
			`[LOADS] Commands loaded: ${commands}\n[LOADS] Buttons loaded: ${buttons.size}\n[LOADS] Selects loaded: ${selects.size}\n[LOADS] Modals loaded: ${modals.size}`
				.cyan
		);
	},
});
