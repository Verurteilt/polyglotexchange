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
		socket.on('user_connected', this.getUsersConnected);
		socket.on('user_disconnected', this.getUsersConnected);
	},

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'chatTitle' },
				'Chat area'
			),
			React.createElement(
				'div',
				{ className: 'chatPersona' },
				React.createElement(UserList, { onClickUser: this.props.onClickUser, users: this.state.users_connected })
			)
		);
	}
});

var UserList = React.createClass({
	displayName: 'UserList',

	render: function render() {
		var onClickUser = this.props.onClickUser;
		var users = this.props.users.map(function (user) {
			return React.createElement(
				User,
				{ onClickUser: onClickUser, user_id: user.user_id, languages: user.languages, gender: user.gender },
				user.username
			);
		});

		return React.createElement(
			'ul',
			null,
			users
		);
	}
});

var User = React.createClass({
	displayName: 'User',

	render: function render() {
		var className = "user " + this.props.gender;
		return React.createElement(
			'li',
			{ onClick: this.props.onClickUser.bind(this, this.props.user_id, this.props.children) },
			React.createElement(
				'span',
				{ className: className },
				this.props.children
			),
			React.createElement(
				'span',
				null,
				this.props.languages
			)
		);
	}
});