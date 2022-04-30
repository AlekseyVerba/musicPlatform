import { ActionFilter, IStateFilter, TypesActionFilter } from "../../../types/reducers/filterReducer"

const defaultState: IStateFilter = {
    filterSelectValue: "create",
    searchValue: ""
}

export const filterReducer = (state = defaultState, action: ActionFilter): IStateFilter => {

    switch(action.type) {

        case TypesActionFilter.CHANGE_FILTER_INPUT: {
            return {
                ...state,
                searchValue: action.payload
            }
        }

        case TypesActionFilter.CHANGE_FILTER_SELECT: {
            return {
                ...state,
                filterSelectValue: action.payload
            }
        }

        default: {
            return state
        }
    }

}