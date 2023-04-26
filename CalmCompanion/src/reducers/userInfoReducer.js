const initialState = {
    chatHistory: [ {"role": "system", "content": "You are a helpful assistant."} ],
    anxietyResults: [],
    depressionResults: [],
}

export default function userInfoReducer(state=initialState, action) {
    switch(action.type) {
        case "PUSH_MESSAGE":
            let tempChatHistory = state.chatHistory;
            if (tempChatHistory.length >= 64) {
                alert("History too long.")
                const newState = { 
                    ...state,
                    chatHistory: [{"role": "system", "content": "You are a helpful assistant."}, action.data]
                }
                return newState    
            }

            const newState = { 
                ...state,
                chatHistory: [...tempChatHistory, action.data]
            }

            return newState;

        case "UPDATE_ANXIETY":
            console.log("UPDATE_ANXIETY");
            return {
                ...state,
                anxietyResults: [...state.anxietyResults, action.data],
            }

        case "UPDATE_DEPRESSION":
            console.log("UPDATE_DEPRESSION");
            return {
                ...state,
                depressionResults: [...state.depressionResults, action.data],
            }
        
        default:
            return state;
    }
}