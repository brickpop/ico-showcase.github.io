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
								<p>This could be the most ambitious token sale yet. <br/>"This is like Elon Musk-level ambition", Kyle Samani of Multicoin Capital, who looked at the offering, told CoinDesk.</p>
								<h6>John Smith</h6>
							</div>
						</div>
						<div className="slider-item">
							<div className="text-center">
								<img src="/static/images/11.jpg" className="rounded-circle" />
								<p>This platform is an attractive investment for all cryptocurrency investors as it helps to solve one of their biggest issues of getting credible data based on market sentiment and hard data analysis. </p>
								<h6>Adam Smith</h6>
							</div>
						</div>
					</Carousel>

				</div>
			</div>
		)
	}
}
