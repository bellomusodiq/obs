let initialState = {
    auth: null,
}
const authInfo = localStorage.getItem('userAuth')
if(authInfo){
    initialState = {
        auth: JSON.parse(authInfo)
    }
}


const reducer = (state=initialState, action) => {
    if(action.type === 'SAVE_AUTH_INFO'){
        const auth = JSON.stringify(action.authData)
        localStorage.setItem('userAuth', auth);
        return {
            ...state,
            auth: action.authData,
        }
    }
    if(action.type === 'LOG_OUT'){
        localStorage.clear();
        return {
            state
        }
    }
    return state;
}

export default reducer;