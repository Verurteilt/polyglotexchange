'use strict';

var UserBox = React.createClass({
	displayName: 'UserBox',

	getUsersConnected: function getUsersConnected() {
		$.ajax({
			url: '/chat/users_connected/'
		}).done((function (data) {
			this.setState({ users_connected: data });
		}).bind(this));
	},

	getInitialState: function getInitialState() {
		return { users_connected: [] };
	},

	componentDidMount: function componentDidMount() {
		this.getUsersConnected();
		//socket.on('user_connected', this.getUsersConnected);
	},

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(UserList, { users: this.state.users_connected })
		);
	}
});

var UserList = React.createClass({
	displayName: 'UserList',

	render: function render() {
		var users = this.props.users.map(function (user) {
			return React.createElement(
				User,
				{ user_id: user.user_id },
				user.username
			);
		});

		return React.createElement(
			'div',
			{ 'class': 'userList' },
			users
		);
	}
});

var User = React.createClass({
	displayName: 'User',

	render: function render() {
		return React.createElement(
			'div',
			{ 'class': 'user', 'data-userid': this.props.user_id },
			this.props.children
		);
	}
});

React.render(React.createElement(UserBox, null), document.getElementById('content'));