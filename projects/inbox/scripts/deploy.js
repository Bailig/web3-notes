const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
require("dotenv").config();
const { compile } = require("./compile");

const { abi, bin } = compile();

const deploy = async () => {
  if (!process.env.MNEMONIC || !process.env.PROVIDER_URL) {
    throw new Error("Missing environment variables.");
  }

  const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.PROVIDER_URL
  );

  const web3 = new Web3(provider);

  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Account ready:", accounts[1]);

    const result = await new web3.eth.Contract(abi)
      .deploy({ data: bin, arguments: ["Hi!"] })
      .send({ gas: "1000000", from: accounts[1] });

    console.log("Deployed to:", result.options.address);

    provider.engine.stop();

    console.log("Done!");
  } catch (error) {
    console.error(error);
    provider.engine.stop();
  }
};

deploy();
