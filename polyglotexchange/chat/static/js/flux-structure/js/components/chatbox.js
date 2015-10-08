var React = require('react');
var stores = require('../stores');
var actions = require('../actions');
var owner = stores.getOwner();
var ChatActions = actions.ChatActions;
var ContainerActions = actions.ContainerActions;


var ChatStore = stores.ChatStore;

var ChatBox = React.createClass({

	getInitialState: function(){
		ChatStore.setState(owner, this.props.to);
		return ChatStore.getState(owner, this.props.to);
	},

	componentDidMount: function(){
		ChatStore.addChangeListener(this._onChange);
		if(this.props.is_chat_group){
			ChatActions.getLastMessages(owner, this.props.to);
		}else{
			ChatActions.getLastMessages(owner, this.props.to);
			
		}
	},
	_onChange: function(){
        this.setState(ChatStore.getState(owner, this.state.to));
    },
    componentWillUnmount: function(){
        ChatStore.removeChangeListener(this._onChange);
    },

	
	render: function(){
		return (
				<div className="chatContainer" from={owner} to={this.state.to} >
					<div className="chatTitle">{this.props.to_username}<div className="closeChat"></div><div id="minimize" className="minimizeChat"></div></div>
					<div className="chatConversationContainer">
					</div>
				</div>
            )
	}
});


module.exports = ChatBox