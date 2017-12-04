const { connect, wrapContract, getAccounts, getBalance, sendTransaction } = require('eth-tx');
const path = require("path");
const fs = require("fs");

const { MiniMeTokenFactory, MiniMeToken, TvrboTokenSale } = require("./build/token-sale.js");

const MiniMeTokenFactoryContract = wrapContract(
	MiniMeTokenFactory.abi,
	MiniMeTokenFactory.byteCode
);
const MiniMeTokenContract = wrapContract(
	MiniMeToken.abi,
	MiniMeToken.byteCode
);
const TvrboTokenSaleContract = wrapContract(
	TvrboTokenSale.abi,
	TvrboTokenSale.byteCode
);

var address;
const tokenAddress = "0x18B14d15cb73FaF374B99BB9763f091817bAf579";
const tokenSaleAddress = "0xF0DABd503253E874c35CF9Da87e6419f2be31fcE";
var vaultAddress;

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
		const accounts = await getAccounts();
		const sender = accounts[5];
		vaultAddress = accounts[1];

		// SALE
		console.log("Attaching to MiniMeToken");
		const tokenInstance = new MiniMeTokenContract(tokenAddress);

		console.log("Attaching to TvrboTokenSale");
		const tokenSaleInstance = new TvrboTokenSaleContract(tokenSaleAddress);

		console.log("Sender still has", await getBalance(sender));
		console.log("Vault still has", await getBalance(vaultAddress));

		console.log("Sending 0.1 eth to", tokenSaleAddress);
		var result = await sendTransaction({
			from: sender,
			to: tokenSaleAddress,
			value: "100000000000000000"
		});
		console.log("Done");

		console.log("Sender now has", await getBalance(sender));
		console.log("Vault now has", await getBalance(vaultAddress));
		console.log();
		console.log("Balance of", sender, await tokenInstance.balanceOf(sender).call({}));
		console.log("Total collected", await tokenSaleInstance.totalCollected().call({}));

	} catch (err) {
		setTimeout(async() => {
			const tokenSaleInstance = new TvrboTokenSaleContract(tokenSaleAddress);
			console.log("STEP", await tokenSaleInstance.debug_step().call({}));
		}, 200)
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
