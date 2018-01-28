import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="project-info">
				<div className="container">

					<div id="project-info-1" className="row">
						<div className="col-md-5">
							<h3>Sample ICO</h3>
							<p>This website is an example of a general purpose Token Sale, build on the Ethereum network.</p>
							<p>Ethereum is the second largest crypto currency in the world. Unlike Bitcoin, it allows organizations to develop immutable, transparent and unstoppable applications that run on the blockchain.</p>
							<p>An increasing number of projects is using Ethereum to create and exchange money (ether) with tokens. Depending on the case, token holders may have shares of a project, right to vote, participation on profits, etc.</p>
						</div>
						<div className="col-md-7 text-center">
							<a href="http://www.the-blockchain.com/docs/Ethereum_white_paper-a_next_generation_smart_contract_and_decentralized_application_platform-vitalik-buterin.pdf" target="_blank" className="btn btn-lg btn-outline-light">Read the White Paper</a>
							<p>ICOs raise money without middlemen, such as venture capitalists and angel investors, which, even if they give you money, they also take a percentage of equity of the company, require a certain number of seats on the board of directors.</p>
							<p>2017 was the year of the token sales boom. In November 2017, the total amount of capital raised has leapt to <strong>$3.6 billion</strong>. In fact, ICOs are now raising more money for start-ups than early stage venture capital.</p>
						</div>
					</div>

					<div id="project-info-2" className="row">
						<div className="col-md-6">
							<h3>What is a Smart Contract?</h3>
							<p>A typical application will be running on a private server. It can be modified and brought down at any time.</p>
							<p>A Smart Contract is a special piece of software that is deployed to the blockchain. A smart contract has the ability to codify the terms of a trade into a publicly immutable auditable and unstoppable program.</p>
						</div>
						<div className="col-md-6">
							<p>This enforces transparency, trust and certainty that every penny sent to smart contract will only be used as stated in the program code. A Smart Contract is the law between people exchanging value.</p>
							<p>In addition to this, Smart Contracts eliminate the costs of server infrastructure, as they only need a one-time fee to deploy to the blockchain and future transactions will be paid by their creators.</p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
