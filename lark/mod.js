import curl from "@8v/curl";

export default (webhook) => async (title, text = "", url = "") => {
  const content = [];
  /*
https://open.larksuite.com/document/server-docs/im-v1/message-card/patch?lang=zh-CN
消息体长度超出限制。文本消息最大不能超过150KB，卡片及富文本消息最大不能超过30KB；此外，若消息中包含大量样式标签，会使实际消息体长度大于您输入的请求体长度。
  */
  text = text.slice(0, 9500);

  if (text) {
    content.push({
      tag: "text",
      text: url ? text + "\n" : text,
    });
  }

  if (url) {
    content.push({
      tag: "a",
      text: url,
      href: url,
    });
  }
  let r = await curl(webhook, {
    method: "POST",
    body: JSON.stringify({
      msg_type: "post",
      content: {
        post: {
          en_us: {
            title,
            content: [content],
          },
        },
      },
    }),
  });
  if (r.status != 200) {
    throw new Error(r.status + " " + (await r.text()));
  }
  r = await r.json();
  if (r.code) {
    throw new Error(r.code + ": " + r.msg);
  }
  return;
};
