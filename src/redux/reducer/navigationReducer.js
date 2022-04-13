const initialState = {
    activeScreen: "Home"
}

const navigationState = (state = initialState, action) => {
    if(action.type === 'SET_ACTIVE_SCREEN') {
        return {
            activeScreen: action.value
        }
    }
    return state;
}

export default navigationState