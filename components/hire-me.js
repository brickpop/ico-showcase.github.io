import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="hire-me">
				<div className="container">

					<div className="row text-center">
						<div className="col-md-8 offset-md-2">
							<h2>You can hire me</h2>
							<p>If you are planning to run an ICO, don't just stand there. <br/>I am an experienced Senior Software Engineer and I can help you fund your next project. </p>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 text-center">
							<a href="#" className="btn btn-lg btn-block btn-outline-light">Hire me</a>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
