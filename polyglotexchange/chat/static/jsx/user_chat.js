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
		socket.on('user_disconnected', this.getUsersConnected);

	},
	
	render: function(){
		return (
				<div>
					<div className="chatTitle">Chat area</div>
					<div className="chatPersona">
						<UserList onClickUser={this.props.onClickUser} users={this.state.users_connected} />
					</div>
				</div>
			)
	}
});



var UserList = React.createClass({
	render: function(){
		var onClickUser = this.props.onClickUser;
		var users = this.props.users.map(function(user){
			return (
				<User  onClickUser={onClickUser} user_id={user.user_id} languages={user.languages} gender={user.gender}>
					{user.username}
				</User>
				)
		});

		return (
				<ul>
					{users}
				</ul>
			)
	}
});
 

var User = React.createClass({
	render: function(){
		 var className = "user " + this.props.gender;
		return (
			<li onClick={this.props.onClickUser.bind(this, this.props.user_id, this.props.children)}>
				<span className={className}>{this.props.children}</span>
				<span>{this.props.languages}</span>
			</li>
			)
	}
});


