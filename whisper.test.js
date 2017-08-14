var shh = web3.shh;

// helper functions
function getPayloadFromMessage(message) {
  return web3.toAscii(message.payload);
}

// single geth client
// symkey
// -------------------------------------------------
// setup symmetric key
sk = shh.newSymKey();
sk = "0x" + sk;
id = shh.addSymKey(sk);

// make topic with symmetric key
topic = shh.newMessageFilter({ symKeyId: id });

// subscribe topic
shh.subscribe("messages", {
  symKeyId: id,
  topics: ["0x" + topic.slice(0, 8)]
});

// post message
shh.post({
  symKeyId: id,
  topic: "0x" + topic.slice(0, 8),
  payload: web3.fromAscii("message to andy"),
  ttl: 50,
  powTime: 50,
  powTarget: 0.2
});

// fetch messages about topic
shh.getFilterMessages(topic).map(getPayloadFromMessage);
// -------------------------------------------------
// asym key
// -------------------------------------------------
// geth 1 : generate keypair
kp = shh.newKeyPair();
privKey = shh.getPrivateKey(kp);
pubKey = shh.getPublicKey(kp);

// make topic with asym key id
topic = shh.newMessageFilter({ privateKeyId: kp });

// subscribe topic
shh.subscribe("messages", {
  privateKeyId: kp,
  topics: ["0x" + topic.slice(0, 8)]
});

// geth 2
pubKey = "pubKey from geth 1";

// post message, topic doesn't need
shh.post({
  pubKey: pubKey,
  payload: web3.fromAscii("message to send"),
  ttl: 50,
  powTime: 50,
  powTarget: 0.2
});

// geth 1 : fetch messages about topic
shh.getFilterMessages(topic).map(getPayloadFromMessage);
// -------------------------------------------------

// multiple geth clients
// from geth 1
sk = shh.newSymKey();
sk = "0x" + sk;
id = shh.addSymKey(sk);
topic = shh.newMessageFilter({ symKeyId: id });

// from geth 2
sk = "..."; // sk from geth 1
id = shh.addSymKey(sk);
topic = shh.newMessageFilter({ symKeyId: id });

// from geth 2
shh.subscribe("messages", {
  symKeyId: id,
  topics: ["0x" + topic.slice(0, 8)]
});

// from geth 1
postMessage(id, topic, "my message string");
shh.post({
  symKeyId: id,
  topic: "0x" + topic.slice(0, 8),
  payload: web3.fromAscii("message to send"),
  ttl: 50,
  powTime: 50,
  powTarget: 0.2
});

// helper functions
function getPayloadFromMessage(message) {
  return web3.toAscii(message.payload);
}

shh.getFilterMessages(topic).map(getPayloadFromMessage);
