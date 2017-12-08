import React from 'react'
import Slider from 'react-slick';


export default class extends React.Component {
	state = {};

	render() {
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: null,
			prevArrow: null
			// fade: true
		};
		return (
			<div id="testimonials">
				<div className="container">

					<div className="row">
						<div className="col text-center">
							<h3>What people thinks about Sample ICO</h3>
						</div>
					</div>

					<Slider {...settings}>
						<div className="slider-item">
							<div className="text-center">
								<img src="http://via.placeholder.com/120x120" className="rounded-circle" />
								<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
								<h6>Mahatmas Ghandi</h6>
							</div>
						</div>
						<div className="slider-item">
							<div className="text-center">
								<img src="http://via.placeholder.com/120x120" className="rounded-circle" />
								<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
								<h6>Mahatmas Ghandi</h6>
							</div>
						</div>
					</Slider>

				</div>
			</div>
		)
	}
}
