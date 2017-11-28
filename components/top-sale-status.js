import React from 'react';

const tokenSaleAddress = "0x123456789abcdef12345678";

export default class extends React.Component {
	state = {};

	componentDidMount() {
		ethTx.connect().then(() => {
			this.setState({connected: true});
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
						<button className="btn btn-success" type="button">Fund the project</button>
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


					<p className="text-center text-muted">{this.state.connected ? "Connected" : "Unavailable"}</p>

				</div>

			</div>
		)
	}
}
