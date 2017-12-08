import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="top-countdown">

				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<h2>ICO Token Sale Demo</h2>
							<p>You are visiting an example of an ICO Token Sale developed by @ledfusion. </p>
							<p>This can be your own ICO. While you are watching this site, hundreds of investors may be funding the project next to you. You are visiting a website that demonstrates the functionalities of a Token Sale.</p>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col text-center">
									<p>The public Token Sale will start in</p>
								</div>
							</div>

							<div className="row">
								<div className="col-2 offset-2">
									<h3>02</h3>
									<p>Days</p>
								</div>
								<div className="col-2">
									<h3>02</h3>
									<p>Hour</p>
								</div>
								<div className="col-2">
									<h3>02</h3>
									<p>Min</p>
								</div>
								<div className="col-2">
									<h3>02</h3>
									<p>Sec</p>
								</div>
							</div>

							<div className="row">
								<div className="col-md-8 offset-md-2">
									<div className="progress">
										<div className="progress-bar" role="progressbar" style={{ width: '87%' }} aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>

							</div>
						</div>
					</div>

				</div>

			</div>
		)
	}
}
