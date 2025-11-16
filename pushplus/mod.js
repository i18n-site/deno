import curl from "@8v/curl/cJson";

/*
token 是 body 无 用户令牌或消息令牌
title 否 body 无 消息标题
content 是 body 无 具体消息内容，根据不同template支持不同格式
template 否 body html 发送消息模板
topic 否 body 无 群组编码
channel 否 body wechat 发送渠道
webhook 否 body 无 webhook编码
callbackUrl 否 body 无 回调地址，异步回调发送结果
timestamp 否 body 无 时间戳，毫秒。如小于当前时间，消息将无法发送
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
            ...conf,
          }),
        });
      }),
    );
  };
};
