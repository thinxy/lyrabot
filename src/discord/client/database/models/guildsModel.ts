import { Schema, model } from "mongoose";

export const GuildSchema = new Schema({
	_id: String,
	config: {
		language: String,
		sugestao: {
			status: { type: Boolean, default: false },
			channel: { type: String, default: "null" },
		},
		moderation: {
			warns: {
				count: { type: Number, default: 0 },
				motive: { type: Array, default: [] },
			},
		},
	},
});

const Guild = model("guilds", GuildSchema);
export default Guild;
