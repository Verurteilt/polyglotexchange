var React = require('react');
var GroupList = require('./grouplist');
var stores = require('../stores');
var GroupsStore = stores.GroupsStore;

var GroupBox = React.createClass({
	
	getInitialState: function(){
		return GroupsStore.getState();
	},

	componentDidMount: function(){
		GroupsStore.addChangeListener(this._onChange);
	},
	_onChange: function(){
        this.setState(GroupsStore.getState())
    },
    componentWillUnmount: function(){
        GroupsStore.removeChangeListener(this._onChange);
    },

	render: function(){
		return (
				<div>
					<div className="chatTitle">Chat Groups</div>
					<div className="chatPersona">
						<GroupList groups={this.state.groups} />
					</div>
				</div>
			)
	}
});


module.exports = GroupBox;