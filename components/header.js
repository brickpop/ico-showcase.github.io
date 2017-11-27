import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="header">
				<style jsx>{`
					#header {
					}
					.input-group {
						max-width: 350px;
					}
					nav.bg-light a.navbar-brand {
						margin: auto;
					}
				`}</style>
				<nav className="navbar navbar-light bg-light">
					<a className="navbar-brand" href="#">Token Sale Demo</a>
				</nav>
				{
					this.props.presale ?
						<nav className="navbar navbar-light bg-primary">
							<a className="navbar-brand" href="#" className="text-light">The Token presale is live</a>
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Subscribe to the newsletter" aria-label="Subscribe to the newsletter" />
								<span className="input-group-btn">
									<button className="btn btn-success" type="button">Subscribe</button>
								</span>
							</div>
						</nav> : ""
				}

			</div>
		)
	}
}
