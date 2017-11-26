import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="team">
				<style jsx>{`
					#team {
						padding: 50px 0;
					}
					#team h3 {
						margin: 20px 0 40px;
					}
					#team h5 {
						margin-top: 20px;
					}
				`}</style>
				<div className="container">

					<div className="row text-center">
						<div className="col">
							<h3>The team</h3>
						</div>
					</div>

					<div className="row text-center">
						<div className="col-md-4">
							<img src="http://via.placeholder.com/100x100" className="rounded-circle" />
							<h5>John Smith, CEO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="http://via.placeholder.com/100x100" className="rounded-circle" />
							<h5>Johana Smith, CTO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="http://via.placeholder.com/100x100" className="rounded-circle" />
							<h5>Johannes Smith, CFO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>

						<div className="col-md-4">
							<img src="http://via.placeholder.com/100x100" className="rounded-circle" />
							<h5>John Smith, CEO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="http://via.placeholder.com/100x100" className="rounded-circle" />
							<h5>Johana Smith, CTO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="http://via.placeholder.com/100x100" className="rounded-circle" />
							<h5>Johannes Smith, CFO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
					</div>

					<div className="row text-center">
						<div className="col">
							<h3>Advisors</h3>
						</div>
					</div>

					<div className="row text-center">
						<div className="col-md-6">
							<img src="http://via.placeholder.com/120x120" className="rounded-circle" />
							<h5>John Smith, Expert</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-6">
							<img src="http://via.placeholder.com/120x120" className="rounded-circle" />
							<h5>Johana Smith, Expert</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
