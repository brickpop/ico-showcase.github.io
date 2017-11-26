import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="top-countdown">
				<style jsx>{`
					#top-countdown {
					}
				`}</style>
				<nav className="navbar navbar-light bg-light">
					<a className="navbar-brand" href="#">Token Sale Demo</a>
				</nav>
				<nav className="navbar navbar-light bg-primary">
					<a className="navbar-brand" href="#" className="text-light">The Token presale is live</a>
					<form className="form-inline">
						<input className="form-control mr-sm-2" type="search" placeholder="Your email address" aria-label="Your email address" />
						<button className="btn btn-outline-light" type="submit">Subscribe</button>
					</form>
				</nav>

				<div className="container">
					<div className="row">
						<div className="col">
							<h2>ICO Token Sale Demo</h2>
							<p>This can be your own ICO. While you are watching this site, hundreds of investors may be funding the project next to you. You are visiting a website that demonstrates the functionalities of a Token Sale.</p>
						</div>
						<div className="col">
							<p>The public Token Sale will start in</p>
							<h3>02 : 14 : 42 : 21</h3>
							<p>Days Hours Minutes Seconds</p>
							<div className="progress">
								<div className="progress-bar" role="progressbar" style={{ width: '87%' }} aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"></div>
							</div>
						</div>
					</div>

				</div>

			</div>
		)
	}
}
