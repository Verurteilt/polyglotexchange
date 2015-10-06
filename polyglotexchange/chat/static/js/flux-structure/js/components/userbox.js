var React = require('react');
var UserList = require('./userlist');
var stores = require('../stores');
var UsersConnectedStore = stores.UsersConnectedStore;

var UserBox = React.createClass({
	
	getInitialState: function(){
		return UsersConnectedStore.getState();
	},

	componentDidMount: function(){
		UsersConnectedStore.addChangeListener(this._onChange);
	},
	_onChange: function(){
        this.setState(UsersConnectedStore.getState())
    },
    componentWillUnmount: function(){
        UsersConnectedStore.removeChangeListener(this._onChange);
    },

	render: function(){
		return (
				<div>
					<div className="chatTitle">Chat area</div>
					<div className="chatPersona">
						<UserList users={users} />
					</div>
				</div>
			)
	}
});


module.exports = UserBox;