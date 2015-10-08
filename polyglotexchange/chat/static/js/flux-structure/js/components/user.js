var React = require('react');
var actions = require('../actions');
var ChatBox = require('./chatbox');
var owner = require('../stores').getOwner();
var ContainerActions = actions.ContainerActions;


var createChat = function(_owner, to){
	ContainerActions.addChat(_owner, to,<ChatBox to={to} to_username={to} />);
}

var User = React.createClass({
	render: function(){
		 var className = "user " + this.props.gender.toLowerCase();
		return (
			<li onClick={createChat.bind(this, owner, this.props.children)}>
				<span className={className}>{this.props.children}</span>
				<span>{this.props.languages}</span>
			</li>
			)
	}
});

module.exports = User;