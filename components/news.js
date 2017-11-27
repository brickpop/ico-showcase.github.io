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
					#news h3 {
						margin-bottom: 20px;
					}
					#news .item {
						margin-top: 20px;
						margin-bottom: 40px;
					}
					.btn.btn-sm {
						width: 160px;
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

							<div className="item row">
								<div className="post-image col-4">
									<a href="#"><img src="http://via.placeholder.com/120x120" /></a>
								</div>
								<div className="col-8">
									<h5>Post title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-primary btn-sm">Read more</a>
								</div>
							</div>
							<div className="item row">
								<div className="post-image col-4">
									<a href="#"><img src="http://via.placeholder.com/120x120" /></a>
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

							<div className="item row">
								<div className="col-3">
									<div className="event-box">
										<h6>14</h6>
										<h5>Jun</h5>
										<p>2017</p>
									</div>
								</div>
								<div className="col-9">
									<h5>Event title goes here</h5>
									<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. </p>
									<a href="#" className="btn btn-outline-primary btn-sm">Read more</a>
								</div>
							</div>

							<div className="item row">
								<div className="col-3">
									<div className="event-box">
										<h6>17</h6>
										<h5>Jun</h5>
										<p>2017</p>
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
