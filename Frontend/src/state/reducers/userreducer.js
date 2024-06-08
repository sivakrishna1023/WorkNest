const reducer = (state = null, action) => {
    switch (action.type) {
        case 'getusername':
            return action.payload;
        default:
            return state;
    }
}

export default reducer;