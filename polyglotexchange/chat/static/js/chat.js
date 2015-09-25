"use strict";

var Message = React.createClass({
	displayName: "Message",

	render: function render() {
		return React.createElement(
			"p",
			null,
			this.props.children
		);
	}
});

var MessagesUserContainer = React.createClass({
	displayName: "MessagesUserContainer",

	render: function render() {
		return React.createElement(
			"div",
			{ className: this.props.className },
			React.createElement(
				"div",
				{ className: "nameChatContainer" },
				React.createElement(
					"span",
					{ className: "nameChat" },
					this.props.username
				)
			),
			this.props.messages_user
		);
	}

});

var MessageForm = React.createClass({
	displayName: "MessageForm",

	sendMessage: function sendMessage(e) {
		e.preventDefault();
		var message = React.findDOMNode(this.refs.message).value.trim();
		if (!message) {
			return;
		}
		this.props.sendMessageNodeJS({ message: message });
		React.findDOMNode(this.refs.message).value = "";
		return;
	},

	render: function render() {
		return React.createElement(
			"form",
			{ onSubmit: this.sendMessage },
			React.createElement(
				"div",
				{ className: "marcoChat" },
				React.createElement("textarea", { ref: "message" })
			),
			React.createElement(
				"div",
				{ className: "marcoChat" },
				React.createElement("input", { type: "submit", value: "Send" })
			)
		)
		/*<form className="MessageForm" onSubmit={this.sendMessage}>
  	<input type="text" placeholder="Message" ref="message" />
  </form>*/
		;
	}

});

var MessagesList = React.createClass({
	displayName: "MessagesList",

	componentDidUpdate: function componentDidUpdate() {
		var node = React.findDOMNode(this);
		node.scrollTop = node.scrollHeight;
	},
	render: function render() {
		var owner = this.props.owner.toString();
		var class_ = "";
		var username = "";
		var messages = [];
		var last_message_sender = ""; //this.props.last_message_sender;
		var messages = [];
		var muc = [];
		var men = this.props.messages;
		var temp = [];

		if (!!men.length) {
			var lm = last_message_sender;
			var tmp_msgs = [];
			var tmp2 = [];
			men.map(function (message) {
				if (message.from_id.toString() == owner) {
					class_ = "marcoChat chat2";
					username = "You";
				} else {
					class_ = "marcoChat";
					username = message.username;
				}
				if (message.from_id.toString() == lm) {
					//&& men.indexOf(message) != men.length-1){ // Es del mismo qu el anterior
					tmp_msgs.push(React.createElement(
						Message,
						null,
						message.message
					));
					tmp2.push({ "className": class_, "username": username });
				} else if (message.from_id.toString() != lm) {
					// No es el mismo
					tmp_msgs = [];
					tmp2 = [];
					tmp_msgs.push(React.createElement(
						Message,
						null,
						message.message
					));
					tmp2.push({ "className": class_, "username": username });
					lm = message.from_id;
				}
				if (men.indexOf(message) == men.length - 1) {
					messages.push(tmp_msgs);
					temp.push(tmp2);
				} else if (message.from_id.toString() != men[men.indexOf(message) + 1].from_id.toString()) {
					messages.push(tmp_msgs);
					temp.push(tmp2);
				}
			});
		}
		if (!!messages.length) {
			messages.map(function (message) {
				var index = messages.indexOf(message);
				var _class = temp[index][0].className;
				var username = temp[index][0].username;
				muc.push(React.createElement(MessagesUserContainer, { className: _class, username: username, messages_user: message }));
			});
		}
		return React.createElement(
			"div",
			{ className: "chatScroll" },
			muc
		);
	}
});

var ChatBox = React.createClass({
	displayName: "ChatBox",

	getLastMessages: function getLastMessages(from_id, to_id) {
		var data2 = [];
		$.ajax({
			url: '/chat/get_last_messages/',
			data: { 'from': from_id, 'to': to_id },
			async: false

		}).done((function (data) {
			data2 = data;
		}).bind(this));
		return data2;
	},
	getLastMessagesGroup: function getLastMessagesGroup(group_id) {
		var data2 = [];
		$.ajax({
			url: '/chat/get_last_messages_group/',
			data: { 'group_id': group_id },
			async: false

		}).done((function (data) {
			data2 = data;
		}).bind(this));
		return data2;
	},
	sendMessageDjango: function sendMessageDjango(from_id, to_id, message) {
		$.ajax({
			url: '/chat/insert_message_notify_nodejs/',
			data: { 'from_id': from_id, 'to_id': to_id, "message": message }
		});
	},
	getInitialState: function getInitialState() {
		var user_id = this.props.user;
		var to_id = this.props.to;
		var username = this.props.username;
		return { messages: [], user_id: user_id, to_id: to_id, username: username, last_message_sender: "" };
	},

	handleMessage: function handleMessage(from_id, to_id, message, username) {
		var mess = this.state.messages;
		mess.push({ "from_id": from_id, "to_id": to_id, "message": message, "username": username });
		var last_message_sender = "";
		if (mess.length > 0) {
			last_message_sender = mess[mess.length - 1].from_id;
		}
		this.setState({
			messages: mess,
			last_message_sender: last_message_sender
		});
	},
	componentDidMount: function componentDidMount() {
		if (this.state.is_chat_group == false) {
			var messages = this.getLastMessages(this.state.user_id, this.state.to_id);
		} else {
			var messages = this.getLastMessagesGroup(this.state.user_id, this.state.to_id);
		}

		var messages_tmp = [];
		var lm_tmp = "";
		for (var message in messages) {
			var _message = messages[message];
			messages_tmp.push({ "from_id": _message.from_id, "to_id": _message.to_id, "message": _message.message,
				"username": _message.username });
			lm_tmp = _message.from_id;
		};
		this.setState({
			messages: messages_tmp,
			last_message_sender: lm_tmp
		});

		var handleMessage = this.handleMessage;
		var to_id = this.state.to_id.toString();
		socket.on('message', function (message) {
			if (to_id == message.from_id.toString()) {
				handleMessage(message.from_id, message.to_id, message.message, message.username);
			}
		});
	},

	sendMessage: function sendMessage(message) {
		this.handleMessage(this.state.user_id, this.state.to_id, message.message, this.state.username);
		this.sendMessageDjango(this.state.user_id, this.state.to_id, message.message);
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "chatContainer", from: this.state.user_id, to: this.state.to_id },
			React.createElement(
				"div",
				{ className: "chatTitle" },
				this.props.to_user_username,
				React.createElement("div", { className: "closeChat" }),
				React.createElement("div", { id: "minimize", className: "minimizeChat" })
			),
			React.createElement(
				"div",
				{ className: "chatConversationContainer" },
				React.createElement(MessagesList, { messages: this.state.messages, owner: this.state.user_id, last_message_sender: this.state.last_message_sender }),
				React.createElement(MessageForm, { sendMessageNodeJS: this.sendMessage })
			)
		);
	}
});

/*if(message.from_id.toString() == lm)//&& men.indexOf(message) != men.length-1){ // Es del mismo qu el anterior
	tmp_msgs.push(<Message >{message.message}</Message>);
	tmp2.push({"className": class_, "username": username});
}else if(message.from_id.toString() != lm){ // No es el mismo 
	tmp_msgs = [];
	tmp2 = [];
	tmp_msgs.push(<Message >{message.message}</Message>);
	tmp2.push({"className": class_, "username": username});
	lm = message.from_id;
}*/