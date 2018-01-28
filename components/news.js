import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="news">
				<div className="container">

					<div className="row">
						<div className="col-md-6">
							<h3>Recent</h3>

							<div className="item row">
								<div className="post-image col-4">
									<a href="#news"><img src="/static/images/corp-1.jpg" className="rounded"/></a>
								</div>
								<div className="col-8">
									<h5>The Airdrop is ready</h5>
									<p>We have the full details of the Airdrop that will start tomorrow at 8:00h UTC. ANT token holders on May 25th will...</p>
									<a href="#news" className="btn btn-outline-success btn-sm">Read more</a>
								</div>
							</div>
							<div className="item row">
								<div className="post-image col-4">
									<a href="#news"><img src="/static/images/corp-2.jpg" className="rounded"/></a>
								</div>
								<div className="col-8">
									<h5>External audit is done</h5>
									<p>The external audit in charge of three of the most respected blockchain engineers has just been delivered. And we have good news! </p>
									<a href="#news" className="btn btn-outline-success btn-sm">Read more</a>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<h3>Upcoming</h3>

							<div className="item row">
								<div className="col-3">
									<a href="#news" className="box-link">
										<div className="event-box rounded">
											<h6>3</h6>
											<h5>Sep</h5>
											<p>{new Date().getFullYear()}</p>
										</div>
									</a>
								</div>
								<div className="col-9">
									<h5>Blockchain Week London '{new Date().getYear() % 100}</h5>
									<p>CEO Jack Smith will be participating in the Blockchain Week London, announcing the public availability... </p>
									<a href="#news" className="btn btn-outline-success btn-sm">Read more</a>
								</div>
							</div>

							<div className="item row">
								<div className="col-3">
									<a href="#news" className="box-link">
										<div className="event-box rounded">
											<h6>10</h6>
											<h5>Sep</h5>
											<p>{new Date().getFullYear()}</p>
										</div>
									</a>
								</div>
								<div className="col-9">
									<h5>World Blockchain Forum</h5>
									<p>CFO Jim Smith, among the speakers in the World Blockchain Forum in Dubai. Jim will be introducing...</p>
									<a href="#news" className="btn btn-outline-success btn-sm">Read more</a>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>
		)
	}
}
