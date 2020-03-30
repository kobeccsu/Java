const initialState = {
    selected: []
}

const toggleSelect = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SELECTED':
            if(state.selected.includes(action.id)){
                const list = state.selected.filter((item, i) => item!=action.id);
                return {selected:list} 
            } else {
                const list = [...state.selected, action.id];
                return {selected:list} 
            }
            
        default:
            return state
    }
}

export default toggleSelect;