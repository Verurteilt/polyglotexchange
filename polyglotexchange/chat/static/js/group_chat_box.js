"use strict";

var GroupsBox = React.createClass({
	displayName: "GroupsBox",

	getGroupsAvailable: function getGroupsAvailable() {
		$.ajax({
			url: '/chat/groups_available/'
		}).done((function (data) {
			this.setState({ groups_available: data });
		}).bind(this));
	},

	getInitialState: function getInitialState() {
		return { groups_available: [] };
	},

	componentDidMount: function componentDidMount() {
		this.getGroupsAvailable();
	},

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "chatTitle" },
				"Chat Groups"
			),
			React.createElement(
				"div",
				{ className: "chatPersona" },
				React.createElement(GroupList, { onClickGroup: this.props.onClickGroup, groups: this.state.groups_available })
			)
		);
	}
});

var GroupList = React.createClass({
	displayName: "GroupList",

	render: function render() {
		var onClickGroup = this.props.onClickGroup;
		var groups = this.props.groups.map(function (group) {
			return React.createElement(
				Group,
				{ onClickGroup: onClickGroup, group_id: group.group_id, language_to: group.language_to, language_from: group.language_from, language_to_img: group.language_to_img, language_from_img: group.language_from_img },
				group.group
			);
		});

		return React.createElement(
			"ul",
			null,
			groups
		);
	}
});

var Group = React.createClass({
	displayName: "Group",

	render: function render() {
		var imgStyle = {
			width: '17px',
			height: '12px',
			marginRight: '10px'
		};
		return React.createElement(
			"li",
			{ onClick: this.props.onClickGroup.bind(this, this.props.group_id, this.props.children) },
			React.createElement(
				"span",
				null,
				React.createElement("img", { src: this.props.language_from_img, style: imgStyle })
			),
			React.createElement(
				"span",
				null,
				React.createElement("img", { src: this.props.language_to_img, style: imgStyle })
			),
			React.createElement(
				"span",
				null,
				this.props.children
			)
		);
	}
});