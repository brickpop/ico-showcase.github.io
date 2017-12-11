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
									<a href="#"><img src="/static/images/corp-1.jpg" className="rounded"/></a>
								</div>
								<div className="col-8">
									<h5>Post title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-success btn-sm">Read more</a>
								</div>
							</div>
							<div className="item row">
								<div className="post-image col-4">
									<a href="#"><img src="/static/images/corp-2.jpg" className="rounded"/></a>
								</div>
								<div className="col-8">
									<h5>Post title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-success btn-sm">Read more</a>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<h3>Upcoming</h3>

							<div className="item row">
								<div className="col-3">
									<a href="#" className="box-link">
										<div className="event-box rounded">
											<h6>14</h6>
											<h5>Jun</h5>
											<p>2017</p>
										</div>
									</a>
								</div>
								<div className="col-9">
									<h5>Event title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-success btn-sm">Read more</a>
								</div>
							</div>

							<div className="item row">
								<div className="col-3">
									<a href="#" className="box-link">
										<div className="event-box rounded">
											<h6>17</h6>
											<h5>Jun</h5>
											<p>2017</p>
										</div>
									</a>
								</div>
								<div className="col-9">
									<h5>Event title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-success btn-sm">Read more</a>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>
		)
	}
}
