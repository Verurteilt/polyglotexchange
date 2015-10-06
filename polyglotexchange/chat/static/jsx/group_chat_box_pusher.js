var GroupsBox = React.createClass({

	getGroupsAvailable: function(){
		$.ajax({
			url: '/chat/groups_available/',
		})
		.done(function(data) {
			this.setState({groups_available:data});
		}.bind(this));
	},

	getInitialState: function(){
		return {groups_available: []}
	},

	componentDidMount: function(){
		this.getGroupsAvailable();
	},
	
	render: function(){
		return (
				<div>
					<div className="chatTitle">Chat Groups</div>
					<div className="chatPersona">
						<GroupList onClickGroup={this.props.onClickGroup}  groups={this.state.groups_available} />
					</div>
				</div>
			)
	}
});

var GroupList = React.createClass({
	render: function(){
		var onClickGroup = this.props.onClickGroup;
		var groups = this.props.groups.map(function(group){
			return (
				<Group onClickGroup={onClickGroup} group_id={group.group_id} language_to={group.language_to} language_from={group.language_from}  language_to_img={group.language_to_img} language_from_img={group.language_from_img}>
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

var Group = React.createClass({
	render: function(){
		var imgStyle = {
			width: '17px',
			height: '12px',
			marginRight: '10px'
		}
		return (
			<li onClick={this.props.onClickGroup.bind(this, this.props.group_id, this.props.children)}>
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
