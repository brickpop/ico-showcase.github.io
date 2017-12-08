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
							<table className="table table-striped table-responsive">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">First Name</th>
										<th scope="col">Last Name</th>
										<th scope="col">Username</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">1</th>
										<td>Mark</td>
										<td>Otto</td>
										<td>@mdo</td>
									</tr>
									<tr>
										<th scope="row">2</th>
										<td>Jacob</td>
										<td>Thornton</td>
										<td>@fat</td>
									</tr>
									<tr>
										<th scope="row">3</th>
										<td>Larry</td>
										<td>the Bird</td>
										<td>@twitter</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="col-md-7">

							<div className="row">
								<div className="col">
									<h4>Market</h4>
								</div>
							</div>
							<div className="row">
								<div className="col-4">
									<p>Target</p>
									<h4>20,000</h4>
								</div>
								<div className="col-4">
									<p>Soft cap</p>
									<h4>11,000</h4>
								</div>
								<div className="col-4">
									<p>Token supply</p>
									<h4>500,000</h4>
								</div>
							</div>
							<hr/>
							<div className="row">
								<div className="col">
									<h4>Use of funds</h4>
								</div>
							</div>
							<div className="row">
								<div className="col-4">
									<p>Token sale</p>
									<h4>70%</h4>
								</div>
								<div className="col-4">
									<p>Reserve</p>
									<h4>20%</h4>
								</div>
								<div className="col-4">
									<p>Team</p>
									<h4>10%</h4>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>
		)
	}
}
