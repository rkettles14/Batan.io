import ioserver, {Socket, Server} from "socket.io";

export default (io: Server, socket: Socket) => {
    socket.on("join", () => {
        console.log("Somebody joined");
    });

    socket.on("message", () => {
        console.log("Received a message");
    });
}
