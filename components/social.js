import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="social">
				<div className="container">

					<div className="row text-center">
						<div className="col">
							<h5>Find us on the net:</h5>
						</div>
					</div>

					<div id="social-icons" className="row text-center">
						<div className="col-3">
							<a href="https://www.twitter.com/twitter" target="_blank">
								<div className="social-icon">
									<i class="fa fa-twitter fa-3x"></i>
								</div>
							</a>
						</div>
						<div className="col-3">
							<a href="https://www.facebook.com/facebook" target="_blank">
								<div className="social-icon">
									<i class="fa fa-facebook fa-3x"></i>
								</div>
							</a>
						</div>
						<div className="col-3">
							<a href="https://t.me/telegram/" target="_blank">
								<div className="social-icon">
									<i class="fa fa-telegram fa-3x"></i>
								</div>
							</a>
						</div>
						<div className="col-3">
							<a href="https://www.reddit.com/r/ethereum/" target="_blank">
								<div className="social-icon">
									<i class="fa fa-pinterest fa-3x"></i>
								</div>
							</a>
						</div>
					</div>

					<div id="subscribe" className="row">
						<div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Subscribe to the newsletter" aria-label="Subscribe to the newsletter" />
								<span className="input-group-btn">
									<button className="btn btn-success" type="button">Subscribe</button>
								</span>
							</div>
						</div>
					</div>

				</div>

			</div>
		)
	}
}
