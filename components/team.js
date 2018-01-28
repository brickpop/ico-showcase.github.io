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
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<SocialLinks />
						</div>
						<div className="col-md-4">
							<img src="/static/images/02.jpg" className="rounded-circle" />
							<h5>Ken Smith, CTO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<SocialLinks />
						</div>
						<div className="col-md-4">
							<img src="/static/images/03.jpg" className="rounded-circle" />
							<h5>Jim Smith, CFO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<SocialLinks />
						</div>

						<div className="col-md-4">
							<img src="/static/images/04.jpg" className="rounded-circle" />
							<h5>Johana Smith, CEO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<SocialLinks />
						</div>
						<div className="col-md-4">
							<img src="/static/images/05.jpg" className="rounded-circle" />
							<h5>Eric Smith, CTO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<SocialLinks />
						</div>
						<div className="col-md-4">
							<img src="/static/images/06.jpg" className="rounded-circle" />
							<h5>Andy Smith, CFO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
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
							<h5>Bruce Smith, Expert</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<SocialLinks />
						</div>
						<div className="col-md-6">
							<img src="/static/images/08.jpg" className="rounded-circle advisor" />
							<h5>Ally Smith, Expert</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
							<SocialLinks />
						</div>
					</div>

				</div>
			</div>
		)
	}
}
