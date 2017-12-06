const { connect, wrapContract, getAccounts, getBalance, sendTransaction, getCurrentWeb3 } = require('eth-tx');
const path = require("path");
const fs = require("fs");
const Promise = require('bluebird');

const { MiniMeTokenFactory, MiniMeToken, Campaign } = require("./build/token-sale.js");

const MiniMeTokenFactoryContract = wrapContract(
	MiniMeTokenFactory.abi,
	MiniMeTokenFactory.byteCode
);
const MiniMeTokenContract = wrapContract(
	MiniMeToken.abi,
	MiniMeToken.byteCode
);
const CampaignContract = wrapContract(
	Campaign.abi,
	Campaign.byteCode
);

var address, accounts;
var factoryAddress, tokenAddress, campaignAddress, vaultAddress;

///////////////////////////////////////////////////////////////////////////////
// Connect to an external RPC node
async function startConnection() {
	console.log("Connecting");

	try {
		// await connect("https://ropsten.infura.io/uHMeUGViSqLHNny2voyv"); // defaults to localhost:8545
		await connect("ws://localhost:8546");
		// await connect(); // defaults to localhost:8545

		// getCurrentWeb3().eth.personal.unlockAccount(accounts[0], "");

		accounts = await getAccounts();
		vaultAddress = accounts[0];
		console.log("ACCOUNTS", accounts);
	} catch (err) {
		console.log("Unable to connect", err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function deployFactory() {
	try {
		console.log();
		console.log("Deploying MiniMeTokenFactory");
		const tokenFactoryInstance = await MiniMeTokenFactoryContract.new();
		console.log("Deployed on", tokenFactoryInstance.$address);
		factoryAddress = tokenFactoryInstance.$address;
	} catch (err) {
		console.log(err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function deployToken() {
	try {
		console.log();
		console.log("Deploying MiniMeToken");
		const tokenInstance = await MiniMeTokenContract.new(
			factoryAddress, //_tokenFactory
			0, //_parentToken,
			0, //_parentSnapShotBlock,
			"Tvrbo Test Token", // _tokenName,
			18, // _decimalUnits,
			"TTK", // _tokenSymbol,
			true //_transfersEnabled
		);
		console.log("Deployed on", tokenInstance.$address);
		tokenAddress = tokenInstance.$address;
	} catch (err) {
		console.log(err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function deployController() {
	try {
		console.log();
		console.log("Deploying Campaign");
		const campaignInstance = await CampaignContract.new(
			Date.now() / 1000 - 60 * 60,// _startFundingTime
			Date.now() / 1000 + 60 * 60 * 24 * 30,// _endFundingTime
			"10000000000000000000000",// _maximumFunding  10000 eth
			vaultAddress,// _vaultAddress
			tokenAddress// tokenAddress
		);
		console.log("Deployed on", campaignInstance.$address);
		console.log();
		campaignAddress = campaignInstance.$address;
	} catch (err) {
		console.log(err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function changeController() {
	try {
		console.log("Setting Campaign instance as controller of the MiniMe Token");
		const tokenInstance = new MiniMeTokenContract(tokenAddress);
		await tokenInstance.changeController(campaignAddress).send({});
		console.log("Changed the token controller");
	} catch (err) {
		console.log(err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function transact() {
	try {
		const sender = accounts[0];

		// SALE
		console.log("Attaching to MiniMeToken");
		const tokenInstance = new MiniMeTokenContract(tokenAddress);
		// tokenInstance.$contract.events.Trace({}).on('data', (ev) => {
		// 	console.log("\n\nTOKEN TRACE", ev)
		// }).on('error', (err) => {
		// 	console.log("\n\nTOKEN TRACE ERROR", err)
		// });

		console.log("Attaching to Campaign");
		const campaignInstance = new CampaignContract(campaignAddress);
		// campaignInstance.$contract.events.Trace({}).on('data', (ev) => {
		// 	console.log("\n\nCAMPAIGN EVENT", ev)
		// }).on('error', (err) => {
		// 	console.log("\n\nCAMPAIGN ERROR", err)
		// });

		console.log("Sender still has", await getBalance(sender));
		console.log("Vault still has", await getBalance(vaultAddress));

		console.log("Sending eth to", campaignAddress);
		var result = await sendTransaction({
			from: sender,
			to: campaignAddress,
			value: 10000000,
			gas: 4400000,
			gasPrice: 96000000000
		});
		console.log("Done");

		console.log("Sender now has", await getBalance(sender));
		console.log("Vault now has", await getBalance(vaultAddress));
		console.log();
		console.log("Balance of", sender, await tokenInstance.balanceOf(sender).call({}), "tokens");
		console.log("Total collected", await campaignInstance.totalCollected().call({}), "ether");

	} catch (err) {
		console.log(err.message, err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//


async function main() {
	try {
		await startConnection();
		await deployFactory();
		await deployToken();
		await deployController();
		await changeController();

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
