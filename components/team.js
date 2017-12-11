import React from 'react'

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
							<h5>John Smith, CEO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="/static/images/02.jpg" className="rounded-circle" />
							<h5>Johana Smith, CTO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="/static/images/03.jpg" className="rounded-circle" />
							<h5>Johannes Smith, CFO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>

						<div className="col-md-4">
							<img src="/static/images/04.jpg" className="rounded-circle" />
							<h5>John Smith, CEO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="/static/images/05.jpg" className="rounded-circle" />
							<h5>Johana Smith, CTO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-4">
							<img src="/static/images/06.jpg" className="rounded-circle" />
							<h5>Johannes Smith, CFO</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
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
							<h5>John Smith, Expert</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
						<div className="col-md-6">
							<img src="/static/images/08.jpg" className="rounded-circle advisor" />
							<h5>Johana Smith, Expert</h5>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
