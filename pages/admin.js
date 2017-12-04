import React from "react";
import Head from 'next/head';
import { connect, useConnection, wrapContract, getAccounts, getBalance, sendTransaction } from "web3-wrap";
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
var tokenFactoryInstance, tokenInstance, tokenSaleInstance;

export default class extends React.Component{
	state = {
		tokenFactoryAddress: "0x79564A09294B62192D7a9C89474A09Bb363b03a6",
		tokenAddress: "0xE9689Fa0a1196adF5126a6D4C662cedcdbbc0406",
		tokenSaleAddress: "0x19b92c9724cc4d0a105d8e62cfb3d383490fdbd4"
	}

	async connectWeb3() {
		try {
			if (typeof window.web3 !== "undefined") {
				await useConnection(window.web3);
			} else if (location.protocol == "file:") {
				throw new Error("Can't connect to the Ethereum net from a local file://");
			} else {
				await connect();
			}
			alert("Connected");
		} catch (err) {
			if (err && err.message.match(/Invalid JSON RPC response/))
				alert("You are using an unsupported browser or your connection is down");
			else
				alert("Unable to connect" + err.message);
			console.log("Unable to connect", err);
		}
	}

	async deployFactory() {
		try {
			console.log();
			console.log("Deploying MiniMeTokenFactory");
			const tokenFactoryInstance = await MiniMeTokenFactoryContract.deploy({});
			console.log("Deployed on", tokenFactoryInstance.$address);

			this.setState({tokenFactoryAddress: tokenFactoryInstance.$address});
		} catch (err) {
			console.log(err);
		}
	}

	async deployToken() {
		try {
			// TOKEN
			console.log();
			console.log("Deploying MiniMeToken");
			const tokenInstance = await MiniMeTokenContract.deploy(
				this.state.tokenFactoryAddress, //_tokenFactory
				0, //_parentToken,
				0, //_parentSnapShotBlock,
				"Tvrbo Test Token", // _tokenName,
				18, // _decimalUnits,
				"TTK", // _tokenSymbol,
				true, //_transfersEnabled
				{}
			);
			console.log("Deployed on", tokenInstance.$address);
			this.setState({tokenAddress: tokenInstance.$address});
		} catch (err) {
			console.log(err);
		}
	}

	async deployTokenSale() {
		try {
			const accounts = await getAccounts();
			var vaultAddress = accounts[1];

			// SALE
			console.log();
			console.log("Deploying TvrboTokenSale");
			const tokenSaleInstance = await TvrboTokenSaleContract.deploy(
				Date.now() / 1000 - 60 * 60,// _startFundingTime
				Date.now() / 1000 + 60 * 60 * 24 * 30,// _endFundingTime
				"10000000000000000000000",// _maximumFunding  10000 eth
				vaultAddress,// _vaultAddress
				this.state.tokenAddress, // tokenInstance.$address,// tokenAddress
				{}
			);
			console.log("Deployed on", tokenSaleInstance.$address);
			console.log();
			this.setState({tokenSaleAddress: tokenSaleInstance.$address});

			tokenInstance = MiniMeTokenContract.attach(this.state.tokenAddress);

			console.log("Setting TvrboTokenSale instance as controller of the MiniMe Token");
			await tokenInstance.changeController(tokenSaleInstance.$address);//tokenSaleInstance.$addres, {});
			console.log("Changed the token controller");
		} catch (err) {
			console.log(err);
		}
	}

	async transact() {
		try {
			const accounts = await getAccounts();
			const sender = accounts[0];
			const vaultAddress = accounts[0];

			// SALE
			console.log("Attaching to MiniMeToken");
			const tokenInstance = MiniMeTokenContract.attach(this.state.tokenAddress);

			console.log("Attaching to TvrboTokenSale");
			const tokenSaleInstance = TvrboTokenSaleContract.attach(this.state.tokenSaleAddress);

			console.log("Sender still has", await getBalance(sender));
			console.log("Vault still has", await getBalance(vaultAddress));

			console.log("Sending 0.02 eth to", this.state.tokenSaleAddress);
			var result = await sendTransaction({
				from: sender,
				to: this.state.tokenSaleAddress,
				value: "20000000000000000",
				gas: 300000
			});
			console.log("Done");

			console.log("Sender now has", await getBalance(sender));
			console.log("Vault now has", await getBalance(vaultAddress));
			console.log();
			console.log("Balance of", sender, await tokenInstance.balanceOf(sender, {}));
			console.log("Total collected", await tokenSaleInstance.totalCollected({}));

		} catch (err) {
			console.log(err.message, err);
		}
	}

	render() {
		return (<div>
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
						<button className="btn btn-warning btn-block" onClick={() => this.connectWeb3()}>Connect</button>
						<button className="btn btn-warning btn-block" onClick={() => this.deployFactory()}>Deploy factory</button>
						<button className="btn btn-warning btn-block" onClick={() => this.deployToken()}>Deploy token</button>
						<button className="btn btn-warning btn-block" onClick={() => this.deployTokenSale()}>Deploy sale</button>
						<button className="btn btn-warning btn-block" onClick={() => this.transact()}>Transact</button>
						{/* <button className="btn btn-warning btn-block" onClick={() => checkFunding()}>Check funding</button> */}
					</div>
				</div>
			</div>
		</div>);
	}
}
