import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="specs">
				<div className="container">

					<div className="row">
						<div className="col-md-5">
							<h3>Specs</h3>
							<p>
							The price during the ICO will depend on the total number of tokens issued, according to the table below:
							</p>
							<table className="table table-striped table-responsive">
								<thead>
									<tr>
										<th scope="col">Tokens issued</th>
										<th scope="col">Price</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>0 to 80,000</td>
										<td>0.10 ETH / Token</td>
									</tr>
									<tr>
										<td>80,001 to 130,000</td>
										<td>0.12 ETH / Token</td>
									</tr>
									<tr>
										<td>130,001 to 200,00</td>
										<td>0.15 ETH / Token</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="col-md-7">
							<div className="row text-right">
								<div className="col">
									<h4>Market</h4>
								</div>
							</div>
							<div className="row text-right">
								<div className="col-4">
									<p>Target</p>
									<h4>200,000</h4>
								</div>
								<div className="col-4">
									<p>Soft cap</p>
									<h4>110,000</h4>
								</div>
								<div className="col-4">
									<p>Token supply</p>
									<h4>500,000</h4>
								</div>
							</div>
							<hr/>
							<br/>
							<div className="row text-right">
								<div className="col">
									<h4>Use of funds</h4>
								</div>
							</div>
							<div className="row text-right">
								<div className="col-4">
									<p>Token sale</p>
									<h4>80%</h4>
								</div>
								<div className="col-4">
									<p>Reserve</p>
									<h4>15%</h4>
								</div>
								<div className="col-4">
									<p>Team</p>
									<h4>5%</h4>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>
		)
	}
}
