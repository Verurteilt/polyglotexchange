'use strict';

var ChatBox = React.createClass({
	displayName: 'ChatBox',

	getLastMessages: function getLastMessages(from_id, to_id) {
		$.ajax({
			url: '/chat/get_last_messages/',
			data: { 'from': from_id, 'to': to_id }
		}).done((function (data) {
			this.setState({ messages: data });
		}).bind(this));
	},
	getInitialState: function getInitialState() {
		var user_id = this.props.user;
		var to_id = this.props.to;
		return { messages: [], user_id: user_id, to_id: to_id };
	},

	handleMessage: function handleMessage(from_id, to_id, message) {
		this.setState({
			messages: this.state.messages.push({ "from_id": from_id, "to_id": to_id, "message": message })
		});
	},
	componentDidMount: function componentDidMount() {
		this.getLastMessages(this.state.user_id, this.state.to_id);
		socket.on('message_received', this.handleMessage);
	},

	render: function render() {
		return React.createElement(
			'div',
			{ 'class': 'chatBox', from: this.props.user_id, to: this.props.to_id },
			React.createElement(MessageList, { messages: this.state.messages, owner: this.state.user_id })
		);
	}
});

var MessagesList = React.createClass({
	displayName: 'MessagesList',

	render: function render() {
		var owner = this.props.user_id;
		var class_ = "left_message";
		var messages = this.props.messages.map(function (message) {
			if (message.from_id = owner) {
				class_ = "right_message";
			}
			return React.createElement(
				Message,
				{ user_id: message.user_id, class_: class_ },
				message.message
			);
		});

		return React.createElement(
			'div',
			{ 'class': 'messagesList' },
			messages
		);
	}
});

var Message = React.createClass({
	displayName: 'Message',

	render: function render() {
		return React.createElement(
			'span',
			{ 'class': this.props.class_ },
			this.props.children
		);
	}
});

React.render(React.createElement(ChatBox, null), document.getElementById('content'));