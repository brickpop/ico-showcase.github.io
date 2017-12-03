const { connect, wrapContract, getAccounts } = require('eth-tx');
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

async function deploy() {
	try {
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

		// FACTORY
		console.log("Deploying MiniMeTokenFactory");
		const tokenFactoryInstance = await MiniMeTokenFactoryContract.new();
		console.log("Deployed on", tokenFactoryInstance.$address);

		// TOKEN
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

		const accounts = await getAccounts();

		// SALE
		console.log("Deploying TvrboTokenSale");
		const tokenSaleInstance = await TvrboTokenSaleContract.new(
			Date.now(),// _startFundingTime
			Date.now() + 1000 * 60 * 60 * 24 * 30,// _endFundingTime
			"10000000000000000000000",// _maximumFunding  10000 eth
			accounts[1],// _vaultAddress
			tokenInstance.$address// tokenAddress
		);
		console.log("Deployed on", tokenSaleInstance.$address);

	} catch (err) {
		console.log(err);
	}
}

///////////////////////////////////////////////////////////////////////////////
//

async function main() {
	try {
		await startConnection();
		await deploy();
	} catch (err) {
		console.log("Unable to complete", err);
	}
}

main();
