import React from 'react'

const SocialLinks = () => <ul className="list-inline social-buttons">
	<li className="list-inline-item">
		<a href="#"><i className="fa fa-twitter"></i></a>
	</li>
	<li className="list-inline-item">
		<a href="#"><i className="fa fa-facebook"></i></a>
	</li>
	<li className="list-inline-item">
		<a href="#"><i className="fa fa-linkedin"></i></a>
	</li>
</ul>;

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="team">
				<div className="container">

					<div className="row text-center">
						<div className="col">
							<h3>The team</h3>
						</div>
					</div>

					<div className="row text-center">
						<div className="col-md-4">
							<img src="/static/images/01.jpg" className="rounded-circle" />
							<h5>Jack Smith, CEO</h5>
							<p>Executive MBA from IESE Business School. Former VP for Business Development in Demo Company Inc.</p>
							<SocialLinks />
						</div>
						<div className="col-md-4">
							<img src="/static/images/02.jpg" className="rounded-circle" />
							<h5>Ken Smith, CTO</h5>
							<p>Computer Science degree from Paris IV. Nine years of experience developing software for medium and large financial institutions. </p>
							<SocialLinks />
						</div>
						<div className="col-md-4">
							<img src="/static/images/03.jpg" className="rounded-circle" />
							<h5>Jim Smith, CFO</h5>
							<p>VP for Business Development. 4 years of experience in business development from the e-gaming industry.</p>
							<SocialLinks />
						</div>

						<div className="col-md-4">
							<img src="/static/images/04.jpg" className="rounded-circle" />
							<h5>Johana Smith, Marketing</h5>
							<p>B2B and B2C marketing expert with experience in both the corporate and governmental sectors. </p>
							<SocialLinks />
						</div>
						<div className="col-md-4">
							<img src="/static/images/06.jpg" className="rounded-circle" />
							<h5>Eric Smith, Communication</h5>
							<p>Expert in digital marketing for financial services. Social media experience as a leader of the Demo Company marketing team. </p>
							<SocialLinks />
						</div>
						<div className="col-md-4">
							<img src="/static/images/05.jpg" className="rounded-circle" />
							<h5>Andy Smith, Design</h5>
							<p>Five years of experience in web and graphic design for social networks and startup companies.</p>
							<SocialLinks />
						</div>
					</div>

					<div className="row text-center">
						<div className="col">
							<h3>Advisors</h3>
						</div>
					</div>

					<div className="row text-center">
						<div className="col-md-6">
							<img src="/static/images/07.jpg" className="rounded-circle advisor" />
							<h5>Bruce Smith, Consultant</h5>
							<p>Involved in banking for more than 10 years. Well known in financial services as long-term executive director. </p>
							<SocialLinks />
						</div>
						<div className="col-md-6">
							<img src="/static/images/08.jpg" className="rounded-circle advisor" />
							<h5>Ally Smith, Consultant</h5>
							<p>Accounting and Audit expert. More than 14 years of experience as a financial analyst and audit manager in international companies such as Arthur Andersen, Deloitte Touche Tohmatsu, and KPMG.</p>
							<SocialLinks />
						</div>
					</div>

				</div>
			</div>
		)
	}
}
