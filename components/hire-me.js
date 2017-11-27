import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="hire-me">
				<style jsx>{`
					#hire-me {
						padding: 50px 0;
						background-color: #f9f9f9;
					}
					#hire-me .btn.btn-lg {
						margin-bottom: 30px;
					}
				`}</style>
				<div className="container">

					<div className="row">
						<div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 text-center">
							<a href="#" className="btn btn-lg btn-block btn-outline-primary">Hire me</a>
						</div>
					</div>
					<div className="row text-center">
						<div className="col-md-8 offset-md-2">
							<p>Did you like it? I am an experienced Senior Software Engineer and I can help you fund your next project. </p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
