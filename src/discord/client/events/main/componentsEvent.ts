import { client } from "@/index";
import { Event } from "@/discord/base/structure/types/Event";

export default new Event({
	name: "interactionCreate",
	run(interaction) {
		if (interaction.isModalSubmit())
			client.modals.get(interaction.customId)?.(interaction);
		if (interaction.isButton())
			client.buttons.get(interaction.customId)?.(interaction);
		if (interaction.isStringSelectMenu())
			client.selects.get(interaction.customId)?.(interaction);
	},
});
