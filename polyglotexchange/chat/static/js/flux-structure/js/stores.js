var $ = require('jquery');
//var ChatBoxComponent = require('./components/chatbox').ChatBox;
var EventEmitter = require('events').EventEmitter;
var ChatDispatcher = require('./actions').ChatDispatcher;
var ChatActions = require('./actions').ChatActions;
var ContainerActions = require('./actions').ContainerActions;
var ContainerDispatcher = require('./actions').ContainerDispatcher;
var Constants = require('./constants');


var _state_group_store = {'groups': []};

var _state_container = {
	'chatBoxes': {},
	'talkingTo': [],
    'owner': ''
};
var _state_userscontainer = {
    'users_connected': {},
    'me': {}
};

var _state_chat = {

};

var getOwner = function(){
    if(_state_container['owner']){
        return _state_container['owner'];
    }
    return $('#user_data').html();

    
};

var updateOwner = function(username){
    _state_container['owner'] = username;
};

var sendMessage = function(message, from, to){
	$.ajax({
			url: '/chat/insert_message_notify_pusher/',
			data: {'from': from, 'to': to, "message": message}
	});
};

var addChat = function(from, to, chatbox){
    var chat_name = from + '-' + to;
    if(_state_container.chatBoxes[chat_name] === undefined){
        _state_container.chatBoxes[chat_name] = chatbox;
        _state_container.talkingTo.push(to);
        ChatGroupStore.emitChange();
    }
};

var addUserConnected = function(member){
    _state_userscontainer['users_connected'][member.id] = {'username': member.info.username, 'info': member.info};
    UsersConnectedStore.emitChange();

};

var removeUser = function(member){
    delete _state_userscontainer['users_connected'][member.id];
    UsersConnectedStore.emitChange();
};

var getUsersConnected = function(){
    if(chat_channel.members.me){
        _state_userscontainer['me'][chat_channel.members.me.id] = {'username': chat_channel.members.me.info.username, 'info': chat_channel.members.me.info};
        chat_channel.members.each(function(member) {
            if(member.id != chat_channel.members.me.id){
                _state_userscontainer['users_connected'][member.id] = {'username': member.info.username, 'info': member.info};
            }
        });
        UsersConnectedStore.emitChange();
    }
};

var getGroupsAvailable = function(){
    $.ajax({
        url: '/chat/groups_available/',
    })
    .done(function(data) {
            _state_group_store['groups'] = data;
            GroupsStore.emitChange();
    });

};

var getMessages = function(from, to){
    $.ajax({
        url: '/chat/get_last_messages/',
        data: {'from': from, 'to': to},
    })
    .done(function(data){
        
        var last_sender = null;
        if(data.length > 0){
            last_sender = data[data.length-1].from;
        }
        _state_chat[from+'-'+to]['messages'] = data;
        _state_chat[from+'-'+to]['last_sender'] = last_sender;
        ChatStore.emitChange();
    });
};

var getMessagesGroup = function(from, to){
        console.log("YEES");
        $.ajax({
            url: '/chat/get_last_messages_group/',
            data: {'group_id': to},
        })
        .done(function(data) {
            var last_sender = null;
            if(data.length > 0){
                last_sender = data[data.length-1].from;
            }
            _state_chat[from+'-'+to]['messages'] = data;
            _state_chat[from+'-'+to]['last_sender'] = last_sender;
            ChatStore.emitChange();
        });
};

var ChatGroupStore = $.extend({}, EventEmitter.prototype, {
    getState: function(from, to) {
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
    getState: function(from , to) {
        if(from !== undefined && to !== undefined){
            return _state_chat[from+'-'+to];
        }
        return {};
    },

    setState: function(from, to){
        if(from !== undefined && to !== undefined){
            _state_chat[from+'-'+to] = {'messages': [], 'to': to, 'last_sender': null};
            return _state_chat[from+'-'+to];
        }
        return {};
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

var GroupsStore = $.extend({}, EventEmitter.prototype, {
    getState: function() {
        return _state_group_store;
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
        addChat(action.from, action.to_user, action.chatbox);
    }else if(action.actionType == Constants.GET_USERS_CONNECTED){
        getUsersConnected();
	}else if(action.actionType == Constants.REMOVE_USER){
        removeUser(action.member);
    }else if(action.actionType == Constants.GET_GROUPS_AVAILABLE){
        getGroupsAvailable();
    }else if(action.actionType == Constants.UPDATE_OWNER){
        updateOwner(action.username);
    }else if(action.actionType == Constants.GET_MESSAGES){
        getMessages(action.from, action.to);
    }else if(action.actionType == Constants.GET_MESSAGES_GROUP){
        getMessagesGroup(action.from, action.to);
    }
    return true;
});



module.exports.ChatGroupStore = ChatGroupStore;
module.exports.UsersConnectedStore = UsersConnectedStore;
module.exports.GroupsStore = GroupsStore;
module.exports.getOwner = getOwner;
module.exports.ChatStore = ChatStore;