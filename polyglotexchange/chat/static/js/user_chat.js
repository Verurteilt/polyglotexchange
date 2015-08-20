var UserBox = React.createClass({

	getUsersConnected: function(){
		$.ajax({
			url: '/chat/users_connected/',
		})
		.done(function(data) {
			this.setState({users_connected:data});
		}.bind(this));
	},

	getInitialState: function(){
		return {users_connected: []}
	},

	componentDidMount: function(){
		this.getUsersConnected();
		socket.on('user_connected', this.getUsersConnected);
	},
	
	render: function(){
		return (
				<div>
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
	<UserBox />,
	document.getElementById('content')
);