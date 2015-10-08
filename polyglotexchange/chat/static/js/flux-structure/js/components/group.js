var React = require('react');
var actions = require('../actions');
var ChatBox = require('./chatbox');
var owner = require('../stores').getOwner();
var ContainerActions = actions.ContainerActions;

var createChat = function(_owner, to, group_name){
	ContainerActions.addChat(_owner, to,<ChatBox to={to} to_username={group_name} is_chat_group={true}/>);
}


var Group = React.createClass({
	render: function(){
		var imgStyle = {
			width: '17px',
			height: '12px',
			marginRight: '10px'
		}
		return (
			<li onClick={createChat.bind(this, owner, this.props.group_id, this.props.children)}>
				<span>
					<img src={this.props.language_from_img} style={imgStyle} />
				</span>
				<span>
					<img src={this.props.language_to_img} style={imgStyle} />
				</span>
				<span>
					{this.props.children}
				</span>
			</li>
			)
	}
});

module.exports = Group;
