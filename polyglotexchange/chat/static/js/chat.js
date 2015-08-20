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
		return {messages: []};
	},
	componentDidMount: function(){
		this.getLastMessages();
		socket.on('message_received', this.getLastMessages);
	},
	
	render: function(){
		return (
				<div class="chatBox">
					<UserList users={this.state.users_connected} />
				</div>
            )
	}
});



var UserList = React.createClass({
	render: function(){
		var users = this.props.users.map(function(user){
			return (
				<User user_id={user.user_id}>
					{user.username}
				</User>
				)
		});

		return (
				<div class="userList">
					{users}
				</div>
			)
	}
});


var User = React.createClass({
	render: function(){
		return (
				<div class="user" data-userid={this.props.user_id}>
					{this.props.children}
				</div>
			)
	}
});


React.render(
	<ChatBox />,
	document.getElementById('content')
);