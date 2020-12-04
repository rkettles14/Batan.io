export const state = () => ({
    chats: {
        'lobby': []
    },
    currentChatId: "",
    currentChat: []
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
    changeToChatRoom(state: any, chatId: string) {
        if(chatId in state.chats){
            state.currentChatId = chatId;
            state.currentChat = state.chats[chatId];
        } else {
            console.log("WARNING - Trying to switch to non existant chat");
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
