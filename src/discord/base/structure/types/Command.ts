/*eslint-disable*/
import {
	ApplicationCommandData,
	AutocompleteInteraction,
	ButtonInteraction,
	Collection,
	CommandInteraction,
	CommandInteractionOptionResolver,
	Message,
	ModalSubmitInteraction,
	PartialMessage,
	StringSelectMenuInteraction,
} from "discord.js";
import { ExtendedClient } from "../ExtendedClient";

interface SlashCommandProps {
	client: ExtendedClient;
	interaction: CommandInteraction;
	options: CommandInteractionOptionResolver;
}
interface MessageCommandProps {
	client: ExtendedClient;
	message: Message<boolean> | PartialMessage;
	args: string[];
}

export type ComponentsButton = Collection<
	string,
	(interaction: ButtonInteraction) => any
>;
export type ComponentsSelect = Collection<
	string,
	(interaction: StringSelectMenuInteraction) => any
>;
export type ComponentsModal = Collection<
	string,
	(interaction: ModalSubmitInteraction) => any
>;

interface CommandComponents {
	buttons?: ComponentsButton;
	selects?: ComponentsSelect;
	modals?: ComponentsModal;
}

export type SlashCommandType = ApplicationCommandData &
	CommandComponents & {
		run(props: SlashCommandProps): any;
		autocomplete?: (interaction: AutocompleteInteraction) => any;
	};
export type MessageCommandType = CommandComponents & {
	name: string;
	description: string;
	aliases?: string[];
	run(props: MessageCommandProps): any;
};

export class SlashCommand {
	constructor(options: SlashCommandType) {
		options.dmPermission = false;
		Object.assign(this, options);
	}
}
export class MessageCommand {
	constructor(options: MessageCommandType) {
		Object.assign(this, options);
	}
}
