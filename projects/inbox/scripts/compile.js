const shell = require("shelljs");

module.exports.compile = () => {
  shell.exec("solcjs --bin --output-dir build contracts/inbox.sol");
  shell.exec("solcjs --abi --output-dir build contracts/inbox.sol");

  const bin = shell.cat("build/contracts_inbox_sol_Inbox.bin").toString();
  const abi = shell.cat("build/contracts_inbox_sol_Inbox.abi").toString();

  return {
    bin,
    abi: JSON.parse(abi),
  };
};
