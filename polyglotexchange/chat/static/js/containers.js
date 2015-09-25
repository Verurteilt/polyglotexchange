"use strict";

var ChatGroupContainer = React.createClass({
    displayName: "ChatGroupContainer",

    render: function render() {
        return React.createElement(
            "div",
            { className: "chatGroupContainer" },
            this.props.chatboxes
        );
    }
});

var ColumnaDerecha = React.createClass({
    displayName: "ColumnaDerecha",

    render: function render() {
        return React.createElement(
            "div",
            { className: "wrapper clearfix" },
            React.createElement(
                "div",
                { className: "columnaDerecha" },
                React.createElement(UserBox, { onClickUser: this.props.onClickUser }),
                React.createElement(GroupsBox, { onClickGroup: this.props.onClickGroup })
            )
        );
    }
});

var MainContainer = React.createClass({
    displayName: "MainContainer",

    getInitialState: function getInitialState() {
        var owner_id = this.props.owner_id;
        return { chatboxes: [], talking_to: [], owner_id: owner_id };
    },
    renderChatbox: function renderChatbox(to_user_id, to_username) {
        var cbs = this.state.chatboxes;
        var talking_to = this.state.talking_to;
        var owner_id = this.props.owner_id;
        var username = this.props.username;
        if (talking_to.indexOf(to_user_id) == -1) {
            cbs.push(React.createElement(ChatBox, { user: owner_id, to: to_user_id, username: username, to_user_username: to_username }));
            this.setState({ chatboxes: cbs });
            talking_to.push(to_user_id);
        }
    },
    renderChatboxGroup: function renderChatboxGroup(group_id, group_name) {
        var cbs = this.state.chatboxes;
        var talking_to = this.state.talking_to;
        var owner_id = this.props.owner_id;
        var username = this.props.username;
        var to_user_id = group_id;
        var is_chat_group = true;
        if (talking_to.indexOf(to_user_id) == -1) {
            cbs.push(React.createElement(ChatBox, { is_chat_group: is_chat_group, user: owner_id, to: to_user_id, username: username, to_user_username: group_name }));
            socket.emit('add_user_to_group', { "user_id": owner_id, "chat_id": to_user_id });
            this.setState({ chatboxes: cbs });
            talking_to.push(to_user_id);
        }
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(ChatGroupContainer, { chatboxes: this.state.chatboxes }),
            React.createElement(ColumnaDerecha, { onClickUser: this.renderChatbox, onClickGroup: this.renderChatboxGroup })
        );
    }
});