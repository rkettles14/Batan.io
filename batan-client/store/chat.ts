export const state = () => ({
    chats: {
        'lobby': []
    },
});

export const mutations = {
    onMessage(state: any, message: any) {
        if(message === null || message === undefined){
            console.log("Warning - received null/undefined message");
            return;
        }
        if(message.chatId in state.chats){
            state.chats[message.chatId].push(message);
        }
    }
    //todo add ability to create a new chat room based on the active games
    //todo once game has finished, maybe remove the chat room?
};