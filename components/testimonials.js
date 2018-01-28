import React from 'react'
import { Carousel } from 'antd';

export default class extends React.Component {
	state = {};

	render() {
		return (
			<div id="testimonials">
				<div className="container">

					<div className="row">
						<div className="col text-center">
							<h3>Testimonials</h3>
						</div>
					</div>

					<Carousel autoplay>
						<div className="slider-item">
							<div className="text-center">
								<img src="/static/images/10.jpg" className="rounded-circle" />
								<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
								<h6>John Smith</h6>
							</div>
						</div>
						<div className="slider-item">
							<div className="text-center">
								<img src="/static/images/11.jpg" className="rounded-circle" />
								<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
								<h6>Adam Smith</h6>
							</div>
						</div>
					</Carousel>

				</div>
			</div>
		)
	}
}
