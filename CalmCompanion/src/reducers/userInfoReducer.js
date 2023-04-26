const initialState = {
    chatHistory: [],
    anxietyResults: [],
    depressionResults: [],
}

export default function userInfoReducer(state=initialState, action) {
    switch(action.type) {
        case "PUSH_MESSAGE":
            console.log("PUSH_MESSAGE");
            return { 
                ...state,
                chatHistory: [...state.chatHistory, action.data]
            }

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