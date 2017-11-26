import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="testimonials">
				<style jsx>{`
					#testimonials {
						padding: 50px 0;
					}
				`}</style>
				<div className="container">

					<div className="row">
						<div className="col text-center">
							<h3>What people thinks about Sample ICO</h3>
						</div>
					</div>
					<div className="row text-center">
						<div className="col-md-10 offset-md-1">
							<img src="http://via.placeholder.com/120x120" className="rounded-circle" />
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
							<h6>Mahatmas Ghandi</h6>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
