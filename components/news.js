import React from 'react'

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="news">
				<style jsx>{`
					#news {
						padding: 50px 0;
					}
					img.post-image {
						max-width: 100%;
					}
					.event-box {
						background-color: #4a4;
						padding: 10px;
						text-align: center;
						color: white;
					}
				`}</style>
				<div className="container">

					<div className="row">
						<div className="col-md-6">
							<h3>Recent</h3>

							<div className="row">
								<div className="post-image col-4">
									<img src="http://via.placeholder.com/120x120" />
								</div>
								<div className="col-8">
									<h5>Post title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-primary btn-sm">Read more</a>
								</div>
							</div>
							<div className="row">
								<div className="post-image col-4">
									<img src="http://via.placeholder.com/120x120" />
								</div>
								<div className="col-8">
									<h5>Post title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-primary btn-sm">Read more</a>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<h3>Upcoming</h3>

							<div className="row">
								<div className="col-3">
									<div className="event-box">
										<h6>14</h6>
										<h5>June</h5>
										<h6>2017</h6>
									</div>
								</div>
								<div className="col-9">
									<h5>Event title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-primary btn-sm">Read more</a>
								</div>
							</div>

							<div className="row">
								<div className="col-3">
									<div className="event-box">
										<h6>14</h6>
										<h5>June</h5>
										<h6>2017</h6>
									</div>
								</div>
								<div className="col-9">
									<h5>Event title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-primary btn-sm">Read more</a>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>
		)
	}
}
