import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="footer">
				<style jsx>{`
					#footer {
						padding: 50px 0;
						background-color: #f1f1f1;
					}
				`}</style>
				<div className="container">

					<div className="row text-center">
						<div className="col">
							<p><small><a href="#project-info">White Paper</a> - <a href="#project-info-2">The project</a> - <a href="#faq">FAQ</a> - <a href="#press">Press</a> - <a href="#team">Team</a></small></p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
