import React from 'react';
import * as Web3Wrap from "web3-wrap";
import { InputGroup, InputGroupButton, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Campaign, MiniMeToken } from "../contracts/build/token-sale.js";
import { getEthUsdRate } from "../lib/api";

const tokenAddress = "0xbc9fddb9c74a79fe4f1e1cdddb30b0651ae4b619";
const tokenSaleAddress = "0xdf6e8a27ec3fde32af47b61f32e09be177dd1c2d";
const vaultAddress = "0x12CB28B5AEe07AA6305f77d73923Da2362b26E63";
const targetNetwork = "ropsten";
const ethTokenRate = 10;

export default class extends React.Component {
	state = {
		status: "(Please wait)",
		loading: true,
		investingValue: 0,
		inputCurrency: "ETH",

		ethUsdRate: 458, // default

		currencyDropDownOpen: false,

		totalBackers: "-",
		totalCollected: "-",
		tokenBalance: 0,

		accounts: []
		// connected
		// network
	};

	componentDidMount() {
		Web3Wrap.onConnectionChanged(status => this.connectionChanged(status));

		this.CampaignContract = Web3Wrap.wrapContract(Campaign.abi, Campaign.byteCode);
		this.MiniMeTokenContract = Web3Wrap.wrapContract(MiniMeToken.abi, MiniMeToken.byteCode);

		this.connect().then(accounts => {
			this.setState({ connected: true, accounts });

			if (!accounts || !accounts.length) throw new Error("Please, unlock your wallet or create an account");
			this.setState({ accounts });

			return Web3Wrap.getNetwork();
		}).then(name => {
			this.setState({ network: name, loading: false });

			if (name != targetNetwork)
				throw new Error(`Please, switch to the ${targetNetwork} network`);

			this.updateInterval = setInterval(() => this.updateSaleStatus(), 5000);
			return this.updateSaleStatus();
		}).then(() => getEthUsdRate().then(rate => this.setState({ ethUsdRate: rate }))).catch(err => {
			this.setState({ status: err.message, loading: false });
		});
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval);
		this.updateInterval = null;
	}

	weiToDollar(wei) {
		if (!wei || wei == "-") return wei;
		return "$ " + ((wei / 1000000000000000000) * this.state.ethUsdRate).toFixed(0);
	}

	connect() {
		if (typeof window.web3 !== "undefined") {
			return Web3Wrap.useConnection(window.web3);
		} else if (location.protocol == "file:") {
			throw new Error("Can't connect to the Ethereum net from a local file://");
		} else {
			return Web3Wrap.connect().catch(err => {
				if (err && err.message.match(/Invalid JSON RPC response/))
					throw new Error("You are using an unsupported browser or your connection is down");
				else throw err;
			});
		}
	}

	attachToContract() {
		if (!this.tokenInstance) {
			this.tokenInstance = this.MiniMeTokenContract.attach(tokenAddress);
		}
		if (!this.tokenSaleInstance) {
			this.tokenSaleInstance = this.CampaignContract.attach(tokenSaleAddress);

			// Listen to events
			// this.tokenInstance.$contract.events.Payment({}).on('data', (ev) => {
			// 	console.log("PAYMENT", ev)
			// }).on('error', (err) => {
			// 	console.log("Payment error", err)
			// });
		}
	}

	updateSaleStatus() {
		this.attachToContract();

		this.tokenSaleInstance.totalBackers().then(amount => {
			this.setState({ totalBackers: amount });

			return this.tokenSaleInstance.totalCollected();
		}).then(amount => {
			this.setState({ totalCollected: amount });

			return Web3Wrap.getAccounts();
		}).then(accounts => {
			this.setState({ accounts });

			return this.tokenInstance.balanceOf(accounts[0]);
		}).then(balance => {
			this.setState({ tokenBalance: balance })
		})
	}

	connectionChanged(status) {
		this.setState(status);

		if (!status.connected)
			this.setState({
				status:
					"You are using an unsupported browser or your connection is down"
			});
		else if (status.accounts && status.accounts.length)
			this.setState({ status: `Web3 connection status changed (${status.network})` });
		else this.setState({ status: "Please, unlock your wallet or create an account" });
	}

	investingValueChanged(ev) {
		const val = parseFloat(ev.target.value) || 0;
		this.setState({ investingValue: val })
	}

	shiftCurrency() {
		if (this.state.inputCurrency == "ETH") this.setState({ inputCurrency: "USD" });
		else if (this.state.inputCurrency == "USD") this.setState({ inputCurrency: "Tokens" });
		else this.setState({ inputCurrency: "ETH" });
	}

	submit() {
		this.attachToContract();

		if(this.state.investingValue <= 0) return alert("Please, enter a positive value");

		var amount;
		if (this.state.inputCurrency == "ETH") {
			amount = this.state.investingValue;
		}
		else if (this.state.inputCurrency == "USD"){
			amount = this.state.investingValue / this.state.ethUsdRate;
		}
		else {
			amount = this.state.investingValue / ethTokenRate;
		}
		amount = String(amount * 1000000000000000000);

		return Web3Wrap.getNetwork()
			.then(name => {
				if (name != targetNetwork)
					throw new Error("Please, switch to the Ropsten network");

				return Web3Wrap.sendTransaction({
					from: this.state.accounts[0],
					to: this.tokenSaleInstance.$address,
					value: amount,
					gas: Math.round(156276 * 1.1)
				});
			})
			.then(result => {
				console.log(result);

				return this.updateSaleStatus();
			})
			.catch(err => {
				alert(err.message);
			});
	}

	renderWeb3Ready() {
		var usdNumber, ethNumber, tokenNumber;
		if (this.state.inputCurrency == "ETH") {
			usdNumber = (this.state.investingValue * this.state.ethUsdRate || 0).toFixed(2);
			ethNumber = (this.state.investingValue || 0).toFixed(2);
			tokenNumber = (this.state.investingValue * ethTokenRate || 0).toFixed(2);
		}
		else if (this.state.inputCurrency == "USD") {
			usdNumber = (this.state.investingValue || 0).toFixed(2);
			ethNumber = ((this.state.investingValue / this.state.ethUsdRate) || 0).toFixed(2);
			tokenNumber = ((this.state.investingValue / this.state.ethUsdRate) * ethTokenRate || 0).toFixed(2);
		}
		else { // TOKEN
			usdNumber = (((this.state.investingValue / ethTokenRate) * this.state.ethUsdRate) || 0).toFixed(2);
			ethNumber = ((this.state.investingValue / ethTokenRate) || 0).toFixed(2);
			tokenNumber = (this.state.investingValue || 0).toFixed(2);
		}

		return <div id="web3-form" className="row">
			<style jsx>{`
				#web3-form {
					padding: 20px 0;
					background-color: #ecfefb;
				}

				.text-center.text-muted {
					margin-top: 13px;
				}
				.btn {
					cursor: pointer;
				}
				.selected-currency {
					color: green;
				}
			`}</style>

			<div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 text-center">
				<label>Token Sale address</label>
				<div className="input-group">
					<span className="input-group-addon">@</span>
					<input type="text" readOnly={true} className="form-control" aria-label="Token Sale Address" value={tokenSaleAddress} />
				</div>

				{/* <p className="text-center text-muted">You currently have a balance of 100 Tokens</p> */}

				<hr />

				<InputGroup>
					<InputGroupButton>
						<ButtonDropdown isOpen={this.state.currencyDropDownOpen} toggle={() => this.setState({ currencyDropDownOpen: !this.state.currencyDropDownOpen })}>
							<DropdownToggle caret color="info" outline> {this.state.inputCurrency} </DropdownToggle>
							<DropdownMenu>
								<DropdownItem header>Input currency</DropdownItem>
								<DropdownItem onClick={() => this.setState({ inputCurrency: "ETH" })}>Ether</DropdownItem>
								<DropdownItem onClick={() => this.setState({ inputCurrency: "USD" })}>U.S. Dollar</DropdownItem>
								<DropdownItem onClick={() => this.setState({ inputCurrency: "Tokens" })}>Tokens</DropdownItem>
							</DropdownMenu>
						</ButtonDropdown>
					</InputGroupButton>
					<Input placeholder="Your investment" onChange={ev => this.investingValueChanged(ev)} />
					<InputGroupButton><Button color="success" onClick={() => this.submit()}>Fund the project</Button></InputGroupButton>
				</InputGroup>

				<p className="text-center text-muted">
					{this.state.inputCurrency == "ETH" ? <strong className="selected-currency">{ethNumber} ETH</strong> : <span>{ethNumber} ETH</span>}
					&nbsp;-&nbsp;
					{this.state.inputCurrency == "USD" ? <strong className="selected-currency">{usdNumber} USD</strong> : <span>{usdNumber} USD</span>}
					&nbsp;-&nbsp;
					{this.state.inputCurrency == "Tokens" ? <strong className="selected-currency">{tokenNumber} Tokens</strong> : <span>{tokenNumber} Tokens</span>}
				</p>

				{
					this.state.tokenBalance > 0 ?
						<p className="text-center text-muted">You currently own <strong>{(this.state.tokenBalance / 1000000000000000000).toFixed(2)} Test Tokens</strong></p> : null
				}
			</div>
		</div>
	}

	renderChromeReady() {
		return <div id="web3-ready" className="row">
			<style jsx>{`
				#web3-ready {
					padding: 20px 0;
					background-color: #fcfeec;
				}

				.btn {
					cursor: pointer;
				}
			`}</style>

			<div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 text-center">
				<label>Token Sale address</label>
				<div className="input-group">
					<span className="input-group-addon">@</span>
					<input type="text" readOnly={true} className="form-control" aria-label="Token Sale Address" value={tokenSaleAddress} />
				</div>

				{/* <p className="text-center text-muted">You currently have a balance of 100 Tokens</p> */}

				<hr />
				<h6>Support for Ethereum</h6>
				<p>In order to launch your transaction, please, check one of these options:</p>

				<div className="row text-center">
					<div className="col-6">
						<a href="" className="btn btn-block btn-outline-primary">Install Metamask<br />for Chrome</a>
						<p><small><a href="#" className="text-muted">More info</a></small></p>
					</div>
					<div className="col-6">
						<a href="" className="btn btn-block btn-outline-success">Connect with <br />MyEtherwallet</a>
						<p><small><a href="#" className="text-muted">More info</a></small></p>
					</div>
				</div>
			</div>
		</div>
	}

	renderUnlockWallet() {
		return <div id="web3-locked" className="row">
			<style jsx>{`
				#web3-locked {
					padding: 20px 0;
					background-color: #fef9ec
				}
			`}</style>

			<div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 text-center">
				<label>Token Sale address</label>
				<div className="input-group">
					<span className="input-group-addon">@</span>
					<input type="text" readOnly={true} className="form-control" aria-label="Token Sale Address" value={tokenSaleAddress} />
				</div>

				<hr />
				<h6>Please, unlock your wallet to continue</h6>
			</div>
		</div>
	}

	renderNoWeb3() {
		return <div id="web3-missing" className="row">
			<style jsx>{`
				#web3-missing {
					padding: 20px 0;
					background-color: #fef9ec
				}
			`}</style>

			<div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 text-center">
				<h6>Your browser is not compatible with Ethereum</h6>
				<p>Please, check one of these options:</p>

				<div className="row text-center">
					<div className="col-md-3 col-sm-6">
						<a href="#"><img src="http://via.placeholder.com/80x80" className="rounded-circle" /></a>
						<h6>Chrome + Metamask</h6>
						<p><small><a href="#" className="text-muted">More info</a></small></p>
					</div>
					<div className="col-md-3 col-sm-6">
						<a href="#"><img src="http://via.placeholder.com/80x80" className="rounded-circle" /></a>
						<h6>Ethereum Mist</h6>
						<p><small><a href="#" className="text-muted">More info</a></small></p>
					</div>
					<div className="col-md-3 col-sm-6">
						<a href="#"><img src="http://via.placeholder.com/80x80" className="rounded-circle" /></a>
						<h6>Parity</h6>
						<p><small><a href="#" className="text-muted">More info</a></small></p>
					</div>
					<div className="col-md-3 col-sm-6">
						<a href="#"><img src="http://via.placeholder.com/80x80" className="rounded-circle" /></a>
						<h6>MyEtherWallet</h6>
						<p><small><a href="#" className="text-muted">More info</a></small></p>
					</div>
				</div>
			</div>
		</div>
	}

	fundingSection() {
		if (this.state.loading) return <div />;
		else if (!this.state.connected) return this.renderNoWeb3();
		else if (!this.state.accounts || !this.state.accounts.length) return this.renderUnlockWallet();
		else if (window && !!window.chrome) return this.renderWeb3Ready()
		else return this.renderWeb3Ready()
	}

	render() {
		return (
			<div id="top-status">

				<style jsx>{`
					#top-status {
						padding: 50px 0;
					}
				`}</style>

				<div className="container">
					<div className="row text-center">
						<div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
							<h2>ICO Token Sale Demo</h2>
							<p>You are visiting an example of an ICO Token Sale developed by @ledfusion. </p>
							<p>This can be your own ICO. While you are watching this site, hundreds of investors may be funding the project next to you.</p>
						</div>
					</div>

					<div className="row text-center">
						<div className="col-4">
							<h3>{this.state.totalBackers}</h3>
							<p>Backers</p>
						</div>
						<div className="col-4">
							<h3>{this.weiToDollar(this.state.totalCollected)}</h3>
							<p>Raised</p>
						</div>
						<div className="col-4">
							<h3>2 days</h3>
							<p>Remaining</p>
						</div>
					</div>

					{/* <p className="text-center text-muted">{this.state.status}</p> */}

					{this.fundingSection()}

				</div>

			</div>
		)
	}
}
