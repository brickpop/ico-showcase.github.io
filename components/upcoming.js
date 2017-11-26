import React from 'react'

export default class extends React.Component {
	state = {};

	componentDidMount() {
		this.setState({ nom: "Jordi" });
	}

	render() {
		return (
			<div>
				<style jsx>{`
					p#testing {color: blue;}
				`}</style>
				<p id="testing">Hello {this.state.nom || "world"}</p>
			</div>
		)
	}
}
