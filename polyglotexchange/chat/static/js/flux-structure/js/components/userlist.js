var React = require('react');
var User = require('./user');
var UserList = React.createClass({
	render: function(){
		var _users = Object.values(this.props.users);
		if(_users.length > 0){
			var users = _users.map(function(user){
				return (
					<User gender={user.info.gender} languages={user.info.languages}>
						{user.info.username}
					</User>
				)
			});
		}

		return (
				<ul>
					{users}
				</ul>
			)
	}
});


module.exports = UserList;