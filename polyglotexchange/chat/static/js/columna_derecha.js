"use strict";

var UserBox = React.createClass({
	displayName: "UserBox",

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
	},

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "chatTitle" },
				"Chat area"
			),
			",",
			React.createElement(
				"div",
				{ className: "chatPersona" },
				React.createElement(UserList, { users: this.state.users_connected })
			)
		);
	}
});

var UserList = React.createClass({
	displayName: "UserList",

	render: function render() {
		var users = this.props.users.map(function (user) {
			return React.createElement(
				User,
				{ user_id: user.user_id, languages: user.languages },
				user.username
			);
		});

		return React.createElement(
			"ul",
			null,
			users
		);
	}
});

var User = React.createClass({
	displayName: "User",

	render: function render() {
		return React.createElement(
			"li",
			null,
			React.createElement(
				"span",
				{ className: "user" },
				this.props.children
			),
			React.createElement(
				"span",
				null,
				this.props.languages
			)
		);
	}
});