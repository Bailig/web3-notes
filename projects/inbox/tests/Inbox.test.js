const Web3 = require("web3");
const ganache = require("ganache");
const fs = require("fs");
const test = require("node:test");
const assert = require("assert");
const { compile } = require("../scripts/compile");

const { bin, abi } = compile();

// const bin = fs.readFileSync("build/contracts_inbox_sol_Inbox.bin", "utf8");
// const abi = fs.readFileSync("build/contracts_inbox_sol_Inbox.abi", "utf8");

const web3 = new Web3(ganache.provider());

const INIT_MESSAGE = "Hi";

const prepare = async () => {
  const accounts = await web3.eth.getAccounts();

  const inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bin, arguments: [INIT_MESSAGE] })
    .send({ from: accounts[0], gas: "1000000" });
  return { accounts, inbox };
};

test("Inbox Contract", () => {
  test("should have address", async () => {
    const { inbox } = await prepare();
    assert.equal(typeof inbox.options.address, "string");
  });

  test("should have initial message", async () => {
    const { inbox } = await prepare();
    const initMessage = await inbox.methods.message().call();
    assert.equal(initMessage, INIT_MESSAGE);
  });

  test("should set new message", async () => {
    const { inbox, accounts } = await prepare();
    const newMessage = "bye";
    const result = await inbox.methods.setMessage(newMessage).send({
      from: accounts[0],
    });

    assert.ok(result);

    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
