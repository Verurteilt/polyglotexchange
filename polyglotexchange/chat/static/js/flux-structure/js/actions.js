var Constants = require('./constants');
var Dispatcher = require('flux').Dispatcher;
var ChatDispatcher = new Dispatcher();
var ContainerDispatcher = new Dispatcher();

var ChatActions = {
	sendMessage: function(message, from, to){
		ContainerDispatcher.dispatch({
			actionType: Constants.SEND_MESSAGE,
			message: message,
			from: from,
			to: to
		});
	},
	getLastMessages: function(from, to){
		ContainerDispatcher.dispatch({
			actionType: Constants.GET_MESSAGES,
			from: from,
			to: to
		});
	},
	getLastMessagesGroup: function(from, to){
		ContainerDispatcher.dispatch({
			actionType: Constants.GET_MESSAGES,
			from: from,
			to: to
		});
	}
};


var ContainerActions = {
	addChat	: function(from, to, chatbox){
		ContainerDispatcher.dispatch({
			actionType: Constants.CHAT_APPENDED,
			from: from,
			to_user: to,
			chatbox: chatbox
		});
	},

	updateOwner: function(username){
		ContainerDispatcher.dispatch({
			actionType: Constants.UPDATE_OWNER,
			username: username
		});

	}
};

var UserBoxActions = {
	getUsersConnected: function(){
		ContainerDispatcher.dispatch({
			actionType: Constants.GET_USERS_CONNECTED,
		});
	},

	listenToNewUsers: function(member){
			ContainerDispatcher.dispatch({
				actionType: Constants.USER_CONNECTED,
				member: member
			});
	},

	removeUser: function(member){
		ContainerDispatcher.dispatch({
			actionType: Constants.REMOVE_USER,
			member: member
		});
	}
};

var GroupBoxActions = {
	getGroupsAvailable: function(){
		ContainerDispatcher.dispatch({
			actionType: Constants.GET_GROUPS_AVAILABLE,
		});
	}
};

module.exports.ChatActions = ChatActions;
module.exports.ChatDispatcher = ChatDispatcher;
module.exports.ContainerActions = ContainerActions;
module.exports.ContainerDispatcher = ContainerDispatcher;
module.exports.UserBoxActions = UserBoxActions;
module.exports.GroupBoxActions = GroupBoxActions;