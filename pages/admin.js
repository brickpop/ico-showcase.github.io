import Head from 'next/head';
import { connect, wrapContract } from "web3-wrap";
import Header from "../components/header";

import { TvrboTokenSale, MiniMeToken, MiniMeTokenFactory } from "../contracts/build/token-sale.js";
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

async function connectWeb3() {
	try {
		await connect(); // defaults to localhost:8545
		alert("Connected");
	} catch (err) {
		console.log("Unable to connect", err);
		alert("Unable to connect" + err.message);
	}
}

async function deployContracts() {
	if(!confirm("You are about to deploy three contracts with your current address as the owner.\nDo you want to continue?")) return;
	try {
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

	}
	catch (err) {

	}
}

export default () => <div>
	<Head>
		<title>Token Sale Demo by @ledfusion</title>
		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous" />
	</Head>

	<style global jsx>{`
		body {}
	`}</style>

	<Header />
	<div className="container">
		<div className="row">
			<div className="col-12">
				<h2>Token Admin</h2>
			</div>
			<hr/>

			<div className="col-md-4">
				<button className="btn btn-warning btn-block" onClick={() =>connectWeb3()}>Connect</button>
				<button className="btn btn-warning btn-block" onClick={() => deployContracts()}>Deploy contracts</button>
			</div>
		</div>
	</div>
</div>
