const Chats=require('../models/chats');
module.exports.chatSocket=function(socketServer){
    let io=require('socket.io')(socketServer,{
        cors: {
            origin:'http://localhost:8000',
          },
    });
    io.sockets.on('connection', function(socket){

        
        console.log('new connection recieved', socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected')
        })

        socket.on('join_chatroom',function(data){
            console.log('join request recieved',data);

            socket.join(data.chatroom);
            Chats.find({}).then(function(msg){
                console.log(msg);
                io.in(data.chatroom).emit('stored_messages', msg);
            })
            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_chat',function(data){
            Chats.create({
                message:data.message,
                user_email: data.user_email,
            })
            io.in(data.chatroom).emit('message_recieved',data);
        })
    })
}