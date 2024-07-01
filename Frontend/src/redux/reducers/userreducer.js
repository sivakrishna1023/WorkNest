const reducer = (state = null, action) => {
    switch (action.type) {
        case 'getuser':
            return action.payload;
        default:
            return state;
    }
}

export default reducer;