import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="project-info">
				<style jsx>{`
					#project-info .row.text-center img {
							max-width: 100%;
							margin-bottom: 15px;
					}
					.btn.btn-lg.btn-outline-primary {
						min-width: 70%;
						margin: 50px 0;
					}
					#project-info-1 {

					}
					#project-info-2 {
						padding: 50px 0;
					}
				`}</style>
				<div className="container">

					<div id="project-info-1" className="row">
						<div className="col-md-5">
							<h3>Sample ICO</h3>
							<p>This is how your project can look in a couple of months.</p>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
						</div>
						<div className="col-md-7 text-center">
							<a href="#" className="btn btn-lg btn-outline-primary">Read the White Paper</a>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
						</div>
					</div>

					<div id="project-info-2" className="row">
						<div className="col-md-6">
							<h3>What is Sample ICO?</h3>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
						</div>
						<div className="col-md-6">
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
