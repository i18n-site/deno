import curl from "@8v/curl";
import { env } from "node:process";

const API_LI = (() => {
  const { NotifyApi } = env;
  return NotifyApi ? NotifyApi.split(" ") : [];
})();

export default async (title, txt, url) => {
  let body = {};

  title && (body.title = title);
  txt && (body.txt = txt);
  url && (body.url = url);

  body = JSON.stringify(body);

  let error;
  for (const api of API_LI) {
    try {
      const r = await curl(
        api,
        {
          method: "POST",
          body,
        },
      );
      if ([200, 204].includes(r.status)) {
        return r;
      }
    } catch (err) {
      error = err;
      console.error(
        new URL(api).host,
        err,
      );
    }
  }
  throw error;
};
