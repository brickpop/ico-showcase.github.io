import React from "react";
import Head from 'next/head';
import { connect, onConnectionChanged, useConnection, wrapContract, getAccounts, getBalance, sendTransaction } from "web3-wrap";
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
var tokenFactoryInstance, tokenInstance, tvrboTokenSaleInstance;

export default class extends React.Component {
	state = {
		accounts: [],
		tokenFactoryAddress: "0x105cea7b6BA40b11BE23534fE316a9a14A6f2978",
		tokenAddress: "0xFEcdeb4BE68D71717D4878113C0E447F5B6B0aC0",
		tvrboTokenSaleAddress: "0x2738b1d693faa46d3f10a56c170dcb18ab4ebeef" // gas limit 849242
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
			onConnectionChanged(status => {
				this.setState({connected: status.connected, network: status.network, accounts: status.accounts});
			})
		} catch (err) {
			if (err && err.message.match(/Invalid JSON RPC response/))
				alert("You are using an unsupported browser or your connection is down");
			else
				alert("Unable to connect" + err.message);
			console.log("Unable to connect", err);
		}
	}

	deployFactory() {
		console.log();
		console.log("Deploying MiniMeTokenFactory");
		MiniMeTokenFactoryContract.deploy({}).then(tokenFactoryInstance => {
			console.log("Deployed on", tokenFactoryInstance.$address);

			this.setState({ tokenFactoryAddress: tokenFactoryInstance.$address });
		}).catch(err => {
			console.log(err);
		});
	}

	// REMIX "0x916331673cd92ff39781e6e5193c8a2a40dd228c",0,0,"Tvrbo Test Token",18,"TTK",true
	deployToken() {
		// TOKEN
		console.log();
		console.log("Deploying MiniMeToken");
		MiniMeTokenContract.deploy(
			this.state.tokenFactoryAddress, //_tokenFactory
			0, //_parentToken,
			0, //_parentSnapShotBlock,
			"Tvrbo Test Token", // _tokenName,
			18, // _decimalUnits,
			"TTK", // _tokenSymbol,
			true, //_transfersEnabled
			{}
		).then(tokenInstance => {
			console.log("Deployed on", tokenInstance.$address);
			this.setState({ tokenAddress: tokenInstance.$address });
		}).catch(err => {
			console.log(err);
		});
	}

	// REMIX 0,1515008862,"10000000000000000000000","0x14f0812AFcE2a5CABF9CfBb8e5CcBf69BeC5e368","0x530741bf65be13157bbaedccaf924f7702d0afba"
	async deployTokenSale() {
		getAccounts().then(accounts => {
			// var vaultAddress = accounts[1];
			var vaultAddress = "0x14f0812AFcE2a5CABF9CfBb8e5CcBf69BeC5e368";

			// SALE
			console.log();
			console.log("Deploying TvrboTokenSale");
			return TvrboTokenSaleContract.deploy(
				Date.now() / 1000 - 60 * 60,// _startFundingTime
				Date.now() / 1000 + 60 * 60 * 24 * 30,// _endFundingTime
				"10000000000000000000000",// _maximumFunding  10000 eth
				vaultAddress,// _vaultAddress
				this.state.tokenAddress, // tokenInstance.$address,// tokenAddress
				{}
			);
		}).then(tvrboTokenSaleInstance => {
			console.log("Deployed on", tvrboTokenSaleInstance.$address);
			console.log();
			this.setState({ tvrboTokenSaleAddress: tvrboTokenSaleInstance.$address });

			tokenInstance = MiniMeTokenContract.attach(this.state.tokenAddress);

			console.log("Setting TvrboTokenSale instance as controller of the MiniMe Token");
			return tokenInstance.changeController(tvrboTokenSaleInstance.$address);//tvrboTokenSaleInstance.$addres, {});
		}).then(() => {
			console.log("Changed the token controller");
		}).catch(err => {
			console.log(err);
		});
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
			const tvrboTokenSaleInstance = TvrboTokenSaleContract.attach(this.state.tvrboTokenSaleAddress);

			console.log("Sender still has", await getBalance(sender));
			console.log("Vault still has", await getBalance(vaultAddress));

			console.log("Sending 0.02 eth to", this.state.tvrboTokenSaleAddress);
			var result = await sendTransaction({
				from: sender,
				to: this.state.tvrboTokenSaleAddress,
				value: "20000000000000000",
				gas: 300000
			});
			console.log("Done");

			console.log("Sender now has", await getBalance(sender));
			console.log("Vault now has", await getBalance(vaultAddress));
			console.log();
			console.log("Balance of", sender, await tokenInstance.balanceOf(sender, {}));
			console.log("Total collected", await tvrboTokenSaleInstance.totalCollected({}));

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
					<hr />

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
