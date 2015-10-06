var Constants = require('./constants');
var Dispatcher = require('flux').Dispatcher;
var ChatDispatcher = new Dispatcher();
var ContainerDispatcher = new Dispatcher();

var ChatActions = {
	sendMessage: function(message, from, to){
		ChatDispatcher.dispatch({
			actionType: Constants.SEND_MESSAGE,
			message: message,
			from: from,
			to: to
		});
	},
}


var ContainerActions = {
	addChat	: function(from, to){
		ContainerDispatcher.dispatch({
			actionType: Constants.CHAT_APPENDED,
			from: from,
			to: to
		});
	},	
}

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
		})
	}
}


module.exports.ChatActions = ChatActions;
module.exports.ChatDispatcher = ChatDispatcher;
module.exports.ContainerActions = ContainerActions;
module.exports.ContainerDispatcher = ContainerDispatcher;
module.exports.UserBoxActions = UserBoxActions;