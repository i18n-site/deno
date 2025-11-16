import curl from "@8v/curl/cJson";

/*
token 是 body 无 用户令牌或消息令牌
channel 否 body wechat 发送渠道
title 否 body 无 消息标题
topic 否 body 无 群组编码
content 是 body 无 具体消息内容，根据不同template支持不同格式
*/

export default (token, topic) => {
  const conf = {
    token,
    topic,
    template: "txt",
  };
  return async (title, content = "", url = "") => {
    if (url) {
      content += "\n" + url;
    }
    return Promise.all(
      ["wechat", "extension"].map(async (channel) => {
        curl("https://www.pushplus.plus/send", {
          body: JSON.stringify({
            title,
            content,
            channel,
            ...conf,
          }),
        });
      }),
    );
  };
};
