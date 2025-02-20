import PG from "@8v/pg";
import heartbeat from "./heartbeat.js";

export default (kind, func, duration) => (...args) =>
  heartbeat(PG, duration, kind, "", func, args);
