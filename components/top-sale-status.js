import React from 'react';
import { HashStore } from "../assets/contracts.js";

const tokenSaleAddress = "0x8af4943ED2744c229976D94045854dc5e374479a";

export default class extends React.Component {
	state = {
		status: "(Please wait)",
		unsupported: false
	};

	componentDidMount() {
		this.HashStoreContract = ethTx.wrapContract(HashStore.abi, HashStore.byteCode);

		ethTx.onConnectionChanged(status => this.connectionChanged(status));

		this.connect().then(accounts => {
			this.setState({ accounts });

			if (accounts && accounts.length) this.setState({ status: "Web3 has been loaded" });
			else throw new Error("Please, unlock your wallet or create an account");

			return ethTx.getNetwork();
		}).then(name => {
			this.setState({ connected: true, network: name });

			if (name != "ropsten")
				throw new Error("Please, switch to the Ropsten network");

			this.updateInterval = setInterval(() => this.updateSaleStatus(), 3000);
			return this.updateSaleStatus();
		}).catch(err => {
			this.setState({ status: err.message });
		});
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval);
		this.updateInterval = null;
	}

	connect() {
		if (typeof window.web3 !== "undefined") {
			return ethTx.useConnection(window.web3);
		} else if (location.protocol == "file:") {
			throw new Error("Can't connect to the Ethereum net from a local file://");
		} else {
			return ethTx.connect().catch(err => {
				this.setState({ unsupported: true });
				if (err && err.message.match(/Invalid JSON RPC response/))
					throw new Error("You are using an unsupported browser or your connection is down");
				else throw err;
			});
		}
	}

	attachToContract() {
		if (!this.hashStoreInstance) {
			this.hashStoreInstance = new this.HashStoreContract(tokenSaleAddress);
		}
	}

	updateSaleStatus() {
		this.attachToContract();

		return this.hashStoreInstance
			.getHash()
			.call()
			.then(hash => {
				this.setState({ status: "Current Hash: " + hash });
			})
			.catch(err => {
				alert(err.message);
				// setStatus(err.message);
			});
	}

	connectionChanged(status) {
		if (!status.connected)
			this.setState({
				status:
					"You are using an unsupported browser or your connection is down"
			});
		else if (status.accounts && status.accounts.length)
			this.setState({ status: `Web3 connection status changed (${status.network})` });
		else this.setState({ status: "Please, unlock your wallet or create an account" });
	}

	submit() {
		this.attachToContract();
debugger;
		const hash = "0x1234";

		return ethTx.getNetwork()
			.then(name => {
				if (name != "ropsten")
					throw new Error("Please, switch to the Ropsten network");

				return this.hashStoreInstance.setHash(hash).send({});
			})
			.then(result => {
				console.log(result);
				this.setState({status: "Updated the hash to " + hash});

				return updateStatus();
			})
			.catch(err => {
				alert(err.message);
			});

	}

	renderWeb3Ready() {
		return <div id="web3-form" className="row">
			<style jsx>{`
				#web3-form {
					padding: 20px 0;
				}

				.text-center.text-muted {
					margin-top: 13px;
				}
				.btn {
					cursor: pointer;
				}
			`}</style>

			<div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
				<label>Token Sale address</label>
				<div className="input-group">
					<span className="input-group-addon">@</span>
					<input type="text" readOnly={true} className="form-control" aria-label="Token Sale Address" value={tokenSaleAddress} />
				</div>

				{/* <p className="text-center text-muted">You currently have a balance of 100 Tokens</p> */}

				<hr />

				<div className="input-group">
					<input type="text" className="form-control" placeholder="Your investment" aria-label="Your investment" />
					<span className="input-group-btn">
						<button className="btn btn-outline-info" type="button"><strong>$</strong> &darr;</button>
					</span>
					<span className="input-group-btn">
						<button className="btn btn-success" type="button" onClick={() => this.submit() }>Fund the project</button>
					</span>
				</div>
				<p className="text-center text-muted">234.00 USD - 1.0234 ETH - 1234 Tokens</p>

				<p className="text-center text-muted">You will be prompted to confirm the transaction</p>
			</div>
		</div>
	}

	renderChromeReady() {

	}

	renderNoWeb3() {

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

					{this.renderWeb3Ready()}


					<p className="text-center text-muted">{this.state.status}</p>

				</div>

			</div>
		)
	}
}
