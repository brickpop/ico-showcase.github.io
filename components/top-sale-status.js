import React from 'react';
import * as Web3Wrap from "web3-wrap";
import { HashStore } from "../assets/contracts.js";
import { getEthUsdRate } from "../lib/api";

const tokenSaleAddress = "0x03f3fE224F6c4eB3437b273fB682326034A69EfD";
const targetNetwork = "ropsten";
const ethTokenRate = 100;

export default class extends React.Component {
	state = {
		status: "(Please wait)",
		loading: true,
		investingValue: 0,
		inputCurrency: "ETH",

		ethUsdRate: 458, // default

		// accounts
		// connected
		// network
	};

	componentDidMount() {
		getEthUsdRate().then(rate => this.setState({ ethUsdRate: rate }));
		Web3Wrap.onConnectionChanged(status => this.connectionChanged(status));

		this.HashStoreContract = Web3Wrap.wrapContract(HashStore.abi, HashStore.byteCode);

		this.connect().then(accounts => {
			this.setState({ connected: true, accounts });

			if (!accounts || !accounts.length) throw new Error("Please, unlock your wallet or create an account");

			return Web3Wrap.getNetwork();
		}).then(name => {
			this.setState({ network: name, loading: false });

			if (name != targetNetwork)
				throw new Error(`Please, switch to the ${targetNetwork} network`);

			this.updateInterval = setInterval(() => this.updateSaleStatus(), 3000);
			return this.updateSaleStatus();
		}).catch(err => {
			this.setState({ status: err.message, loading: false });
		});
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval);
		this.updateInterval = null;
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
		if (!this.hashStoreInstance) {
			this.hashStoreInstance = this.HashStoreContract.attach(tokenSaleAddress);
		}
	}

	updateSaleStatus() {
		this.attachToContract();

		return this.hashStoreInstance
			.getHash()
			.then(hash => {
				this.setState({ status: "Current Hash: " + hash });
			})
			.catch(err => {
				// alert(err.message);
				// setStatus(err.message);
			});
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
		// 	debugger;
		// 	const hash = "0x1234";

		// 	return Web3Wrap.getNetwork()
		// 		.then(name => {
		// 			if (name != "ropsten")
		// 				throw new Error("Please, switch to the Ropsten network");

		// 			return this.hashStoreInstance.setHash(hash).send({});
		// 		})
		// 		.then(result => {
		// 			console.log(result);
		// 			this.setState({ status: "Updated the hash to " + hash });

		// 			return updateStatus();
		// 		})
		// 		.catch(err => {
		// 			alert(err.message);
		// 		});

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

				<div className="input-group">
					<input type="text" className="form-control" placeholder="Your investment" aria-label="Your investment" onChange={ev => this.investingValueChanged(ev)} />
					<span className="input-group-btn">
						<button className="btn btn-outline-info" type="button" onClick={() => this.shiftCurrency()}>{this.state.inputCurrency}</button>
					</span>
					<span className="input-group-btn">
						<button className="btn btn-success" type="button" onClick={() => this.submit()}>Fund the project</button>
					</span>
				</div>
				<p className="text-center text-muted">
					{this.state.inputCurrency == "ETH" ? <strong className="selected-currency">{ethNumber} ETH</strong> : <span>{ethNumber} ETH</span>}
					&nbsp;-&nbsp;
					{this.state.inputCurrency == "USD" ? <strong className="selected-currency">{usdNumber} USD</strong> : <span>{usdNumber} USD</span>}
					&nbsp;-&nbsp;
					{this.state.inputCurrency == "Tokens" ? <strong className="selected-currency">{tokenNumber} Tokens</strong> : <span>{tokenNumber} Tokens</span>}
				</p>

				<p className="text-center text-muted">You will be prompted to confirm the transaction</p>
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
		return <p className="text-center">Please, unlock your wallet</p>;
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
							<h3>27</h3>
							<p>Backers</p>
						</div>
						<div className="col-4">
							<h3>$ 70,000</h3>
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
