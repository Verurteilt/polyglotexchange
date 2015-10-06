var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var ChatDispatcher = require('./actions').ChatDispatcher;
var ChatActions = require('./actions').ChatActions;
var ContainerActions = require('./actions').ContainerActions;
var ContainerDispatcher = require('./actions').ContainerDispatcher;
var Constants = require('./constants');

var _state_container = {
	'chatBoxes': [],
	'talkingTo': [],
    'owner': ''
};

var _state_userscontainer = {
    'users_connected': {},
    'me': {}
}
var _state_chat = {

};

var sendMessage = function(message, from, to){
	$.ajax({
			url: '/chat/insert_message_notify_pusher/',
			data: {'from': from, 'to': to, "message": message}
	});
}

var addChat = function(from, to){
	_state_container.chatBoxes.append("");
	_state_container.talkingTo.append(to);
	ChatGroupStore.emitChange();
}

var addUserConnected = function(member){
    _state_userscontainer['users_connected'][member.id] = {'username': member.info.username, 'info': member.info};
    UsersConnectedStore.emitChange();

}

var removeUser = function(member){
    delete _state_userscontainer['users_connected'][member.id];
    UsersConnectedStore.emitChange();
}

var getUsersConnected = function(){
    _state_userscontainer['me'][chat_channel.members.me.id] = {'username': chat_channel.members.me.info.username, 'info': chat_channel.members.me.info}
    chat_channel.members.each(function(member) {
        if(member.id != chat_channel.members.me.id){
            _state_userscontainer['users_connected'][member.id] = {'username': member.info.username, 'info': member.info};
        }
    });
    UsersConnectedStore.emitChange()
};

var ChatGroupStore = $.extend({}, EventEmitter.prototype, {
    getState: function() {
        return _state_container;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

var ChatStore = $.extend({}, EventEmitter.prototype, {
    getState: function() {
        return _state_chat;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

var UsersConnectedStore = $.extend({}, EventEmitter.prototype, {
    getState: function() {
        return _state_userscontainer;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});


ContainerDispatcher.register(function(action){   
    if(action.actionType == Constants.USER_CONNECTED){
        addUserConnected(action.member);
    }else if(action.actionType == Constants.CHAT_APPENDED){
        addChat(action.from, action.to);
    }else if(action.actionType == Constants.GET_USERS_CONNECTED){
        getUsersConnected();
	}else if(action.actionType == Constants.REMOVE_USER){
        removeUser(action.member)
    }
});



module.exports.ChatGroupStore = ChatGroupStore
module.exports.UsersConnectedStore = UsersConnectedStore