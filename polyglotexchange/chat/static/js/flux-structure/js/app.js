var React = require('react');
var MainContainer = require('./components/container');
var $ = require('jquery');
var stores = require('./stores');
var actions = require('./actions');
var UserBoxActions = actions.UserBoxActions;
var GroupBoxActions = actions.GroupBoxActions;
var ContainerActions = actions.ContainerActions;
var div_user = $('#user_data');
var owner_id = div_user.data('id');
var username = div_user.html();
ContainerActions.updateOwner(username);
React.render(
	 <MainContainer owner_id={owner_id} username={username}/>,
	    document.getElementById('main')
);
chat_channel.bind('pusher:subscription_succeeded', function(members){
	UserBoxActions.getUsersConnected();
});
chat_channel.bind('pusher:member_added', function(member){
	UserBoxActions.listenToNewUsers(member);
});

chat_channel.bind('pusher:member_removed', function(member){
	UserBoxActions.removeUser(member);
});


UserBoxActions.getUsersConnected();
GroupBoxActions.getGroupsAvailable();
