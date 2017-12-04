const { connect, wrapContract, getAccounts, getBalance, sendTransaction, getCurrentWeb3 } = require('eth-tx');
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
var tokenAddress, tokenSaleAddress, vaultAddress;

///////////////////////////////////////////////////////////////////////////////
// Connect to an external RPC node
async function startConnection() {
	console.log("Connecting");

	try {
		await connect("https://ropsten.infura.io/uHMeUGViSqLHNny2voyv"); // defaults to localhost:8545
		// await connect(); // defaults to localhost:8545
	} catch (err) {
		console.log("Unable to connect", err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function deploy() {
	try {
		const accounts = await getAccounts();
		vaultAddress = accounts[0];
		console.log("ACCOUNTS", accounts);

		getCurrentWeb3().eth.personal.unlockAccount(accounts[0], "");

		// FACTORY
		console.log();
		console.log("Deploying MiniMeTokenFactory");
		const tokenFactoryInstance = await MiniMeTokenFactoryContract.new();
		console.log("Deployed on", tokenFactoryInstance.$address);

		// TOKEN
		console.log();
		console.log("Deploying MiniMeToken");
		const tokenInstance = await MiniMeTokenContract.new(
			tokenFactoryInstance.$address, //_tokenFactory
			0, //_parentToken,
			0, //_parentSnapShotBlock,
			"Tvrbo Test Token", // _tokenName,
			18, // _decimalUnits,
			"TTK", // _tokenSymbol,
			true //_transfersEnabled
		);
		console.log("Deployed on", tokenInstance.$address);

		// SALE
		console.log();
		console.log("Deploying TokenSale");
		const tokenSaleInstance = await TvrboTokenSaleContract.new(
			Date.now() / 1000 - 60 * 60,// _startFundingTime
			Date.now() / 1000 + 60 * 60 * 24 * 30,// _endFundingTime
			"10000000000000000000000",// _maximumFunding  10000 eth
			vaultAddress,// _vaultAddress
			tokenInstance.$address// tokenAddress
		);
		console.log("Deployed on", tokenSaleInstance.$address);
		console.log();

		console.log("Setting TokenSale instance as controller of the MiniMe Token");
		await tokenInstance.changeController(tokenSaleInstance.$address).send({});
		console.log("Changed the token controller");

		tokenAddress = tokenInstance.$address;
		tokenSaleAddress = tokenSaleInstance.$address;
	} catch (err) {
		console.log(err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function transact() {
	try {
		const accounts = await getAccounts();
		const sender = accounts[0];

		// SALE
		console.log("Attaching to MiniMeToken");
		const tokenInstance = new MiniMeTokenContract(tokenAddress);

		console.log("Attaching to TokenSale");
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
		console.log("Balance of", sender, await tokenInstance.balanceOf(sender).call({}), "tokens");
		console.log("Total collected", await tokenSaleInstance.totalCollected().call({}), "ether");

	} catch (err) {
		console.log(err.message, err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//


async function main() {
	try {
		await startConnection();
		await deploy();

		console.log("\n\nTRANSACTION 1");
		await transact();
		console.log("\n\nTRANSACTION 2");
		await transact();
		console.log("\n\nTRANSACTION 3");
		await transact();
		console.log("\n\nTRANSACTION 4");
		await transact();
		console.log("\n\nTRANSACTION 5");
		await transact();
		console.log("\n\nTRANSACTION 6");
		await transact();
	} catch (err) {
		console.log("Unable to complete", err);
	}
}

main();
