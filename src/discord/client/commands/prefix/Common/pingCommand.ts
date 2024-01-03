import { MessageCommand } from "@/discord/base/structure/types/Command";

export default new MessageCommand({
  name: "ping",
  description: "Veja a minha latência com a conexão na API do Discord.",
  async run({ client, message }) {
    let clientMS = client.ws.ping,
      messageMS = Date.now() / message.createdTimestamp;

    await message.reply({
      content: `🏓 **Pong!** Minha latência está em \`${clientMS}\`, respondi essa mensagem em \`${messageMS}ms\`!`,
    });
  },
  
});
