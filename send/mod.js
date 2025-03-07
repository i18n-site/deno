import Send from "./Send.js";
import fromEnv from "./fromEnv.js";
import { env } from "node:process";

export default Send(fromEnv(env));
