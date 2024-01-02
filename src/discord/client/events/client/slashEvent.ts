import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "@/index";
import { Event } from "@/discord/base/structure/types/Event";

export default new Event({
	name: "interactionCreate",
	async run(interaction) {
		if (interaction.isCommand()) {
			const command = client.SlashCommands.get(interaction.commandName);
			if (!command) return;

			const options =
				interaction.options as CommandInteractionOptionResolver;

			command.run({ client, interaction, options });
		}

		if (interaction.isAutocomplete()) {
			const command = client.SlashCommands.get(interaction.commandName);
			if (!command || !command.autocomplete) return;

			command.autocomplete(interaction);
			return;
		}
	},
});
