var React = require('react');
var Group = require('./group');

var GroupList = React.createClass({
	render: function(){
		var groups = this.props.groups.map(function(group){
			return (
				<Group group_id={group.group_id} language_to={group.language_to} language_from={group.language_from}  language_to_img={group.language_to_img} language_from_img={group.language_from_img}>
					{group.group}
				</Group>
				)
		});

		return (
				<ul>
					{groups}
				</ul>
			)
	}
});

module.exports = GroupList;