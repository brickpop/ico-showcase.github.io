const ethTx = require('eth-tx');
const path = require("path");
const fs = require("fs");

///////////////////////////////////////////////////////////////////////////////
// Compile solidity files

async function compile() {
  console.log("Compiling code");

  try {
		// TOKEN SALE
    var source = path.resolve(__dirname, "TvrboTokenSale.sol");
    var destination = path.resolve(__dirname, "build", "token-sale.js");
    if (!fs.existsSync(path.dirname(destination))) {
      fs.mkdirSync(path.dirname(destination));
    }
		await ethTx.compileTo(source, destination, {}).catch(console.log);

		// MINI ME TOKEN
    source = path.resolve(__dirname, "util", "MiniMeTokenFactory.sol");
    destination = path.resolve(__dirname, "build", "token-factory.js");
    await ethTx.compileTo(source, destination, {}).catch(console.log);
	}
	catch (err) {
    console.log("Unable to compile", err);
  }
}

async function main() {
  try {
    await compile();
  } catch (err) {
    console.log("Unable to complete", err);
  }
}

main();
