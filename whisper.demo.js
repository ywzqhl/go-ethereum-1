function getPayloadFromMessage(message) {
  return web3.toAscii(message.payload);
}

sk = "0x39ee0ebba58515b565e00c926cd7cfaeab815ca8ebda6654b91b9ddd5ef1ecd5";
id = shh.addSymKey(sk);
topic = shh.newMessageFilter({ symKeyId: id });

shh.subscribe("messages", {
  symKeyId: id,
  topics: ["0x" + topic.slice(0, 8)]
});

shh.post({
  symKeyId: id,
  topic: "0x123ab322",
  // topic: "0x" + topic.slice(0, 8),
  payload: web3.fromAscii("message to carl 2222"),
  ttl: 50,
  powTime: 50,
  powTarget: 0.2
});

shh.getFilterMessages(topic).map(getPayloadFromMessage);
