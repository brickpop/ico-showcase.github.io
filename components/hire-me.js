import React from 'react'
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
const FormItem = Form.Item;
const validator = require("email-validator");

const ContactForm = Form.create()(
	(props) => {
		const { visible, onCancel, onCreate, form } = props;
		const { getFieldDecorator } = form;
		return (
			<Modal
				visible={visible}
				title="Contact form"
				okText="Contact"
				cancelText="Close"
				onCancel={onCancel}
				onOk={onCreate}
			>
				<Form layout="vertical">
					<p>To get in contact, please fill in the fields below and submit the form. <br/>I will be glad to respond.</p>
					<FormItem>
						{getFieldDecorator('name', {
							rules: [{ required: true, message: 'Please, let me have a name to greet you' }],
						})(
							<Input placeholder="Your name" />
							)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('email', {
							rules: [{ required: true, message: 'Please, let me have an email to contact you back :)' }],
						})(
							<Input placeholder="Contact email" />
							)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('message', {
							rules: [{ required: true, message: 'Please, write a message before submitting the form :)' }],
						})(
							<Input.TextArea rows={4} placeholder="Message" />
							)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
);



export default class extends React.Component {
	state = {};

	showModal() {
		this.setState({ visible: true });
	}
	handleCancel() {
		this.setState({ visible: false });
	}
	handleCreate() {
		const form = this.form;
		form.validateFields((err, values) => {
			if (err) {
				return console.error(err);
			}
			else if(!validator.validate(values.email)){
				return message.error("Please, check that you entered a valid email address");
			}

			axios.post("https://formspree.io/jpcman@gmail.com", values).then(res => {
				message.success("Your message was received, thank you!");
				form.resetFields();
				this.setState({ visible: false });
			}).catch(err => {
				message.error("There was an error processing your request");
			});
		});
	}
	saveFormRef(form) {
		this.form = form;
	}

	render() {
		return (
			<div id="hire-me">
				<div className="container">
					<ContactForm
						visible={this.state.visible}
						ref={ref => this.saveFormRef(ref)}
						onCancel={() => this.handleCancel()}
						onCreate={() => this.handleCreate()}
					/>

					<div className="row text-center">
						<div className="col-md-8 offset-md-2">
							<h2>You can hire me</h2>
							<p>If your next endeavour involves running an ICO, don't just stand there. <br />I am an experienced Senior Software Engineer and I can help you fund the next big thing. </p>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 text-center">
							<a onClick={() => this.showModal()} className="btn btn-lg btn-block btn-outline-light">Hire me</a>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
