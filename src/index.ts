import { ExtendedClient } from "./discord/base/structure/ExtendedClient";
import { onCrash } from "./functions/main";

import config from "./settings/config.json";
import("./discord/client/database/connect");
export * from "colors";

const client = new ExtendedClient();
client.start();

export { client, config };

process.on("uncaughtException", onCrash);
process.on("unhandledRejection", onCrash);
