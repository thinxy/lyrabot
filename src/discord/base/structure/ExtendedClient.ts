import {
  Client,
  Partials,
  IntentsBitField,
  BitFieldResolvable,
  GatewayIntentsString,
  Collection,
  ApplicationCommandDataResolvable,
  ClientEvents,
} from "discord.js";

import { EventType } from "./types/Event";
import {
  SlashCommandType,
  MessageCommandType,
  ComponentsButton,
  ComponentsModal,
  ComponentsSelect,
} from "./types/Command";

import Database from "../../client/database/main";
import Functions from "../../../functions/main";

import fs from "fs";
import path from "path";
const cwd = process.cwd();

import { config as dotenv } from "dotenv";

dotenv();

const fileCondition = (fileName: string) =>
  fileName.endsWith(".ts") || fileName.endsWith(".js");

export class ExtendedClient extends Client {
  public MessageCommands: Collection<string, MessageCommandType> =
    new Collection();
  public aliases: Collection<string, string> = new Collection();
  public SlashCommands: Collection<string, SlashCommandType> = new Collection();

  public buttons: ComponentsButton = new Collection();
  public selects: ComponentsSelect = new Collection();
  public modals: ComponentsModal = new Collection();

  public database = new Database();
  public functions = Functions;

  constructor() {
    super({
      intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
        GatewayIntentsString,
        number
      >,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
    });
  }

  public start() {
    this.registerModules();
    this.registerEvents();
    this.registerPrefix();
    this.login(process.env.CLIENT_TOKEN);
  }

  public registerPrefix() {
    const commandsPath = path.join(
      __dirname,
      "../..",
      "client",
      "commands",
      "prefix"
    );

    fs.readdirSync(commandsPath).forEach((local) => {
      fs.readdirSync(commandsPath + `/${local}/`)
        .filter(fileCondition)
        .forEach(async (fileName) => {
          const command: MessageCommandType = (
            await import(`../../client/commands/prefix/${local}/${fileName}`)
          )?.default;

          const { name, aliases, buttons, selects, modals } = command;

          if (name) {
            this.MessageCommands.set(name, command);

            if (aliases && Array.isArray(aliases))
              aliases.forEach((a) => this.aliases.set(a, name));
            if (buttons)
              buttons.forEach((run, key) => this.buttons.set(key, run));
            if (selects)
              selects.forEach((run, key) => this.selects.set(key, run));
            if (modals) modals.forEach((run, key) => this.modals.set(key, run));
          }
        });
    });
  }

  private registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
    this.application?.commands
      .set(commands)
      .then(() => {
        console.log("[SLASHCOMMANDS] Successfully defined to the Discord API.".green);
      })
      .catch((error) => {
        console.log(
          `❌ | An error occurred while trying to set the Slash Commands (/): \n${error}`
            .red
        );
      });
  }

  private registerModules() {
    const slashCommands: Array<ApplicationCommandDataResolvable> = new Array();

    const commandsPath = path.join(
      __dirname,
      "../..",
      "client",
      "commands",
      "slash"
    );

    fs.readdirSync(commandsPath).forEach((local) => {
      fs.readdirSync(commandsPath + `/${local}/`)
        .filter(fileCondition)
        .forEach(async (fileName) => {
          const command: SlashCommandType = (
            await import(`../../client/commands/slash/${local}/${fileName}`)
          )?.default;
          const { name, buttons, selects, modals } = command;

          if (name) {
            this.SlashCommands.set(name, command);
            slashCommands.push(command);

            if (buttons)
              buttons.forEach((run, key) => this.buttons.set(key, run));
            if (selects)
              selects.forEach((run, key) => this.selects.set(key, run));
            if (modals) modals.forEach((run, key) => this.modals.set(key, run));
          }
        });
    });

    this.on("ready", () => this.registerCommands(slashCommands));
  }

  private registerEvents() {
    const eventsPath = path.join(__dirname, "../..", "client", "events");

    fs.readdirSync(eventsPath).forEach((local) => {
      fs.readdirSync(`${eventsPath}/${local}`)
        .filter(fileCondition)
        .forEach(async (fileName) => {
          const { name, once, run }: EventType<keyof ClientEvents> = (
            await import(`../../client/events/${local}/${fileName}`)
          )?.default;

          try {
            if (name) once ? this.once(name, run) : this.on(name, run);
          } catch (error) {
            console.log(`An error occurred on event: ${name} \n${error}`.red);
          }
        });
    });
  }
}
