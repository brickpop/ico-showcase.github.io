import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="project-features">
				<div className="container">
					<div className="row text-center">
						<div className="col-md-4">
							<img src="/static/images/eth.png" className="rounded-circle" />
							<h5>Standard ERC20 Token</h5>
							<p>Ethereum tradeable tokens follow the ERC20 standard. They can be transfered and traded as any other currency.</p>
						</div>
						<div className="col-md-4">
							<img src="/static/images/ux.png" className="rounded-circle" />
							<h5>User experience</h5>
							<p>Investment platforms should be as simple and uncomplicated as possible. There should never be one more click than necessary.</p>
						</div>
						<div className="col-md-4">
							<img src="/static/images/eye-candy.jpg" className="rounded-circle" />
							<h5>Eye candy</h5>
							<p>Users visiting an engaging and attractive web site are much more likely to invest in a project. A project like yours.</p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
