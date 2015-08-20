from slughifi import slughifi


def generate_activation_code(user):
	import md5, uuid,random
	return md5.new( str(random.random()) + user.email + uuid.uuid4().hex ).hexdigest()