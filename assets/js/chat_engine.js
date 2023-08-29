class ChatEngine{
    constructor(chatBoxId,email){
        this.chatBox=$(`#${chatBoxId}`);
        this.email=email

        this.socket= io.connect('http://localhost:5000');

        if(this.email){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self=this;
        this.socket.on('connect',function(){
            console.log('Chat Engine Server connection established');

            self.socket.emit('join_chatroom',{
                user_email:self.email,
                chatroom: 'Codeil',
            })

            self.socket.on('user_joined',function(data){
                console.log('a user has joind the chat',data);
            })


        });
        self.socket.on('stored_messages',function(data){
            console.log('message recieved',data);
            if(data.length){
                data.forEach(element => {
                   let newMessage= $('<li>');

                    let messagetype= 'others';

                    if(element.user_email == self.email){
                        messagetype = 'self';
                    }

                    newMessage.append($('<span>',{
                        'html': element.message,
                    }))

                    newMessage.append($('<sub>',{
                        html: element.user_email,
                    }))

                    newMessage.addClass(messagetype);
                    $('#chatter').append(newMessage) 
                    let obj = document.getElementById('chatter');
                    console.log(obj.scrollHeight)
                    obj.scrollTop = obj.scrollHeight;
                });
            }
            

        });

        $('#send-message').click(function(){
            // console.log($('#chatter').scrollHeight)
            let obj = document.getElementById('chatter');
            console.log(obj.scrollHeight)
            obj.scrollTop = obj.scrollHeight;

            let msg= $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_chat',{
                    message: msg,
                    user_email:self.email,
                    chatroom: "Codeil",
                });
            };
        });

        self.socket.on('message_recieved',function(data){
            console.log('message recieved',data.message);

            let newMessage= $('<li>');

            let messagetype= 'others';

            if(data.user_email == self.email){
                messagetype = 'self';
            }

            newMessage.append($('<span>',{
                'html': data.message,
            }))

            newMessage.append($('<sub>',{
                html: data.user_email,
            }))

            newMessage.addClass(messagetype);
            $('#chatter').append(newMessage)
            let obj = document.getElementById('chatter');
            console.log(obj.scrollHeight)
            obj.scrollTop = obj.scrollHeight;

        })
    }
}



// messageBody.scrollHeight - messageBody.clientHeight;
