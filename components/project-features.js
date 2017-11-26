import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="project-features">
				<style jsx>{`
					#project-features {
						padding: 50px 0;
						background-color: #f9f9f9;
					}
				`}</style>
				<div className="container">
					<div className="row text-center">
						<div className="col-md-4">
							<img src="http://via.placeholder.com/80x80" className="rounded-circle" />
							<h5>Standard ERC20 Token</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="http://via.placeholder.com/80x80" className="rounded-circle" />
							<h5>Standard ERC20 Token</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="http://via.placeholder.com/80x80" className="rounded-circle" />
							<h5>Standard ERC20 Token</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
