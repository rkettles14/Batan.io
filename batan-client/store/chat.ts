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
    },
    createChatRoom(state: any, chatId: string) {
        if(chatId in state.chats){
            return;
        }
        state.chats[chatId] = [];
    }
    //todo once game has finished, maybe remove the chat room?
};