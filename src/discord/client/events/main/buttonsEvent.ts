import { Event } from "@/discord/base/structure/types/Event";
import { client } from "@/index";

export default new Event({
  name: "interactionCreate",
  async run(interaction) {
    if (interaction.isButton()) {
    }
  },
});
