const initialState = {
    items: []
}
const ADD_TODO = "ADD_TODO";
export const addTodo = (text) => ({
    type: ADD_TODO,
    payload: text
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                items: [...state.item, action.payload]
            };
        default:
            return state;

    }
}

export default reducer;