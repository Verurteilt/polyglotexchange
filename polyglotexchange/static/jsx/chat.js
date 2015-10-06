var ChatBox = React.createClass({
	getLastMessages: function(from_id, to_id){
		$.ajax({
			url: '/chat/get_last_messages/',
			data: {'from': from_id, 'to': to_id}
		})
		.done(function(data) {
			this.setState({messages:data});
		}.bind(this));
	},
	getInitialState: function(){
		var user_id = this.props.user;
		var to_id = this.props.to;
		return {messages: [], user_id: user_id, to_id:to_id};
	},

	handleMessage: function(from_id, to_id, message){
		this.setState(
			{
				messages: this.state.messages.push({"from_id": from_id, "to_id": to_id, "message": message})
			}
		);
	},
	componentDidMount: function(){
		this.getLastMessages(this.state.user_id, this.state.to_id);
		socket.on('message_received', this.handleMessage);
	},
	
	render: function(){
		return (
				<div class="chatBox" from={this.props.user_id} to={this.props.to_id} >
					<MessageList messages={this.state.messages} owner={this.state.user_id}/>
				</div>
            )
	}
});



var MessagesList = React.createClass({
	render: function(){
		var owner = this.props.user_id;
		var class_ = "left_message";
		var messages = this.props.messages.map(function(message){
			if(message.from_id = owner){
				class_ = "right_message";
			}
			return (
				<Message user_id={message.user_id} class_={class_}>
					{message.message}
				</Message>
				)
		});

		return (
				<div class="messagesList">
					{messages}
				</div>
			)
	}
});

var Message = React.createClass({
	render: function(){
		return (
				<span class={this.props.class_}>
					{this.props.children}
				</span>
			)
	}
});



React.render(
	<ChatBox />,
	document.getElementById('content')
);