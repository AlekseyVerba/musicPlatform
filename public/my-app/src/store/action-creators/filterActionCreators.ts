import { ActionFilter, TypesActionFilter } from "../../types/reducers/filterReducer"
import { TypeFilter } from "../../types/filter/"

export const actionChangeFilterInput = (payload: string): ActionFilter => {
    return {
        type: TypesActionFilter.CHANGE_FILTER_INPUT,
        payload
    }
}

export const actionChangeFilterSelect = (payload: TypeFilter): ActionFilter => {
    return {
        type: TypesActionFilter.CHANGE_FILTER_SELECT,
        payload
    }
}