import PG from "@8v/pg";
import heartbeat from "./heartbeat.js";

export default (kind, func, duration) => ([name, ...args]) =>
  heartbeat(PG, duration, kind, name, func, args);
