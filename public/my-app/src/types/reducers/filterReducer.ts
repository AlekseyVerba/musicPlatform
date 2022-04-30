export enum TypesActionFilter {
    CHANGE_FILTER_INPUT = "CHANGE_FILTER_INPUT",
    CHANGE_FILTER_SELECT = "CHANGE_FILTER_SELECT",
}

interface ActionChangeFilterInput {
    type: TypesActionFilter.CHANGE_FILTER_INPUT
    payload: string
}

interface actionChangeFilterSelect {
    type: TypesActionFilter.CHANGE_FILTER_SELECT
    payload: string 
}

export type ActionFilter = ActionChangeFilterInput | actionChangeFilterSelect

export interface IStateFilter {
    searchValue: string
    filterSelectValue: string
}