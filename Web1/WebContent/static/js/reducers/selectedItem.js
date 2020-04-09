const initialState = {
    selected: [],
    tabledata:[]
}

const toggleSelect = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SELECTED':
            if(state.selected.filter((item)=>item.id == action.id).length > 0){
                const list = state.selected.filter((item, i) => item.id != action.id);
                return Object.assign ({}, state, {selected: list});
            } else {
                const list = [...state.selected, {id:action.id, name: action.name}];
                return Object.assign ({}, state, {selected: list});
            }
            case 'SETLIST':
                return Object.assign ({}, state, {selected: action.idnamelist});
        default:
            return state
    }
}

export default toggleSelect;