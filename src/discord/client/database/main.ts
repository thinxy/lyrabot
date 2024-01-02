import User from "./models/usersModel";
import Guild from "./models/guildsModel";

export default class Database {
	public users = User;
	public guilds = Guild;

	public async findOrCreate(id: string, type: string, filter: string = "") {
		if (type == "users") {
			let data = await User.findOne({ _id: id }, filter);
			if (!data) data = await User.create({ _id: id });
			return data;
		} else if (type == "guilds") {
			let data = await Guild.findOne({ _id: id }, filter);
			if (!data) data = await Guild.create({ _id: id });
			return data;
		}
	}

	public async updateCoins(id: string, amount: number): Promise<boolean> {
		if (!amount || !id || isNaN(amount)) return false;
		await User.updateOne(
			{ _id: id },
			{ $inc: { "economy.money": amount } },
			{ upsert: true }
		);
		return true;
	}
}
