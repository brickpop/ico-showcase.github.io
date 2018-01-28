import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="roadmap">
				<div className="container">

					<div className="row">
						<div className="col text-center">
							<h3>Roadmap</h3>

							<ul className="timeline">
								<li>
									<div className="timeline-image">
										<img className="rounded-circle img-fluid" src="/static/images/roadmap-3.jpg" alt="" />
									</div>
									<div className="timeline-panel">
										<div className="timeline-heading">
											<h3>Core development</h3>
										</div>
										<div className="timeline-body">
											<p className="text-muted">Develop the minimum viable product, release the first version of the SDK and deploy the initial IT infrastructure.</p>
										</div>
									</div>
								</li>
								<li className="timeline-inverted">
									<div className="timeline-image">
										<img className="rounded-circle img-fluid" src="/static/images/roadmap-5.png" alt="" />
									</div>
									<div className="timeline-panel">
										<div className="timeline-heading">
											<h3>External auditing</h3>
										</div>
										<div className="timeline-body">
											<p className="text-muted">Core systems and smart contracts audited by three of the most respected blockchain engineers. At the same time, the core system is open sourced to the community.</p>
										</div>
									</div>
								</li>
								<li>
									<div className="timeline-image">
										<img className="rounded-circle img-fluid" src="/static/images/roadmap-6.jpg" alt="" />
									</div>
									<div className="timeline-panel">
										<div className="timeline-heading">
											<h3>Airdrop</h3>
										</div>
										<div className="timeline-body">
											<p className="text-muted">Full details about the airdrop will be disclosed on June 7th. People holding ANT tokens on May 25th will be granted a 1:1 amount of Demo Tokens.</p>
										</div>
									</div>
								</li>
								<li className="timeline-inverted">
									<div className="timeline-image">
										<img className="rounded-circle img-fluid" src="/static/images/roadmap-7.jpg" alt="" />
									</div>
									<div className="timeline-panel">
										<div className="timeline-heading">
											<h3>Initial Coin Offering</h3>
										</div>
										<div className="timeline-body">
											<p className="text-muted">40% of the Demo tokens will be distributed during September-October {new Date().getFullYear()} to finance the world-wide launch campaign and the upcoming development stages.</p>
										</div>
									</div>
								</li>
								<li>
									<div className="timeline-image">
										<img className="rounded-circle img-fluid" src="/static/images/roadmap-9.jpg" alt="" />
									</div>
									<div className="timeline-panel">
										<div className="timeline-heading">
											<h3>Exchange listing</h3>
										</div>
										<div className="timeline-body">
											<p className="text-muted">Full details will be disclosed at the right time. However, an agreement is already made with two of the five major exchanges as of today.</p>
										</div>
									</div>
								</li>
								<li className="timeline-inverted">
									<div className="timeline-image">
										<img className="rounded-circle img-fluid" src="/static/images/roadmap-10.png" alt="" />
									</div>
									<div className="timeline-panel">
										<div className="timeline-heading">
											<h3>Public release</h3>
										</div>
										<div className="timeline-body">
											<p className="text-muted">General availability of the minimum viable product. Start of the world-wide launch campaign.</p>
										</div>
									</div>
								</li>
								<li className="timeline">
									<div className="timeline-image">
										<h4>{new Date().getFullYear()}</h4>
									</div>
								</li>
							</ul>



						</div>
					</div>

				</div>
			</div>
		)
	}
}
