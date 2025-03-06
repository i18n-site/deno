import curl from "@8v/curl";

export default (api) => (title, txt) =>
  curl(api, {
    method: "POST",
    body: JSON.stringify({
      title,
      txt,
    }),
  });
