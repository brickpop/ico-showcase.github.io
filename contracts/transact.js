const { connect, wrapContract, getAccounts, sendTransaction } = require('eth-tx');
const path = require("path");
const fs = require("fs");

const { MiniMeTokenFactory, MiniMeToken } = require("./build/token-factory.js");
const { TvrboTokenSale } = require("./build/token-sale.js");

var address;

///////////////////////////////////////////////////////////////////////////////
// Connect to an external RPC node
async function startConnection() {
	console.log("Connecting");

	try {
		await connect(); // defaults to localhost:8545
	} catch (err) {
		console.log("Unable to connect", err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function transact() {
	try {
		const tokenSaleAddress = "0x33Efa70bDd4852E10251B56e0F8Bef956281083a";
		const TvrboTokenSaleContract = wrapContract(
			TvrboTokenSale.abi,
			TvrboTokenSale.byteCode
		);

		const accounts = await getAccounts();

		// SALE
		console.log("Attaching to TvrboTokenSale");
		const tokenSaleInstance = new TvrboTokenSaleContract(tokenSaleAddress);

		var result = await sendTransaction({
			from: accounts[5],
			to: tokenSaleAddress,
			value: "10000000000000000"
		});
	} catch (err) {
		console.log(err.message, err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function main() {
	try {
		await startConnection();
		await transact();
	} catch (err) {
		console.log("Unable to complete", err);
	}
}

main();
