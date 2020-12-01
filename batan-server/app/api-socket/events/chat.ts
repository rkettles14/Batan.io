import ioserver, {Socket, Server} from "socket.io";

class Message {
    chatId: string;
    userName: string;
    userImgUrl: string;
    timestamp: string;
    content: string;

    constructor(chatId: string, userName:string, userImgUrl: string, content: string){
        this.chatId = chatId;
        this.userName = userName;
        this.userImgUrl = userImgUrl;
        this.content = content;
        this.timestamp = "";
    }
};

function log(msg: Message) {
    console.log("chat id: " + msg.chatId);
    console.log("user name: " + msg.userName);
    console.log("user picture: " + msg.userImgUrl);
    console.log("timestamp " + msg.timestamp);
    console.log("msg: " + msg.content);
}

function log_brief(msg: Message) {
    console.log("MSG - chat: " + msg.chatId + " user: " + msg.userName);
}

export default (io: Server, socket: Socket) => {
    socket.on("chat/message", (message: Message) => {
        if(message === null || message === undefined){
            console.log("Warning - received a null/undefined message");
            return;
        }

        message.timestamp = new Date(Date.now()).toUTCString();
        log_brief(message);
        io.emit("chat/message", message); //todo maybe only send to those that are a part of the same game
        //todo store the message?
    });
}
