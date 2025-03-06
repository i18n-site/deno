import curl from "@8v/curl";

export default (appToken, ...topicIds) => (title, msg, url) => {
  // https://wxpusher.zjiecode.com/docs/#/?id=send-msg
  // 单条消息的数据长度(字符数)限制是：content<40000;summary<20(微信的限制，大于20显示不完);url<400;
  let content = title + "\n" + msg;

  if (url) {
    content += "\n" + url;
  }

  const body = {
    appToken,
    summary: title,
    content,
    contentType: 1,
    topicIds,
  };
  if (url) {
    body.url = url;
  }
  return curl(
    "https://wxpusher.zjiecode.com/api/send/message",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
};
