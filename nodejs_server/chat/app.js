var http = require('http');
var server = http.createServer().listen(4000);
var io = require('socket.io').listen(server);
var redis = require('redis');
var client_redis = redis.createClient();
var pub = redis.createClient();
var client_redis_grupos = redis.createClient();
var pub_grupos = redis.createClient();

client_redis.subscribe("chat");
client_redis_grupos.subscribe("chat_groups");

client_redis.on('message', function(channel,message){
    pub.hgetall(message.user_id, function(err, data){
    	pub.hgetall(message.to, function(err, data2){
    		io.to(data2.socket_id).emit("message", {"from": data.username, "message": message.message});	
    	});
    	
    });
	
});

client_redis_grupos.on('message', function(channel, message){
	var from = message.user_id;
	var message_user = message.message;
	var message_chat_id = message.chat_id;
	obtener_usuarios_chat_grupo("chat:"+message_chat_id, function(err,miembros){
		miembros.forEach(function(user_id){
			pub.hgetall(user_id, function(error,usuario){
				io.to(usuario['socket_id']).emit("message", {"from":"SERVER GROUPS", "message": "HOLALALALA"});
			});

		});
	});
});


client_redis_grupos.on( 'error', function(){ console.log( arguments ) } )

io.sockets.on('connection', function(socket){
	
	

	socket.on('init', function(message){
		pub.hmset(message.user_id, "user_id", message.user_id, "socket_id", socket.id, "username", message.username)
		socket.broadcast.emit('user_connected');
	});

	socket.on('add_user_to_group', function(message){
		pub_grupos.sadd("chat:" + message.chat_id, message.user_id);
		pub_grupos.sadd("user:" + message.user_id, message.chat_id);
	});
});



function obtener_usuarios_chat_grupo(chat_id, cb){
		pub_grupos.smembers("chat:" + message, function(err, miembros){
		cb(err, miembros);
	});
}