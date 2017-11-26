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
							<p><small><a href="#">White Paper</a> - <a href="#">The project</a> - <a href="#">FAQ</a> - <a href="#">Press</a> - <a href="#">Team</a></small></p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
