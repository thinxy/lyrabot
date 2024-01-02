import { SlashCommand } from "@/discord/base/structure/types/Command";
import { ApplicationCommandType } from "discord.js";

export default new SlashCommand({
  name: "ping",
  description: "Veja minha latência com a API do Discord.",
  type: ApplicationCommandType.ChatInput,
  async run({ interaction }) {
    await interaction.reply({
      content: `Ping: \`${interaction.client.ws.ping}ms\`.`,
      ephemeral: true,
    });
  },
});
