import { ActionsUserList, IStateUserList, TypesActionsUserList } from "../../../types/reducers/UsersListReducer"

const defaultStateUserList: IStateUserList = {
     users: [],
     isMoreUserList: true
}

export const userListReducer = (state = defaultStateUserList, action: ActionsUserList): IStateUserList => {
    
    switch(action.type) {

        case TypesActionsUserList.GET_LIST_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.payload]
            }
        }

        case TypesActionsUserList.CLEAR_LIST_USERS: {
            return {
                ...state,
                users: [],
                isMoreUserList: true
            }
        }

        case TypesActionsUserList.IS_MORE_USER_LIST: {
            return {
                ...state,
                isMoreUserList: action.payload
            }
        }

        case TypesActionsUserList.ADD_FOLLOWER_TO_USER_LIST: {
            return {
                ...state,
                users: [...state.users.map(user => {
                    if (user._id === action.payload.userFollowingID) {
                        user.followers.push(action.payload.currentUserID)
                    }
                    return user
                })]
            }
        }

        case TypesActionsUserList.REMOVE_FOLLOWER_FROM_USER_LIST: {
            return {
                ...state,
                users: [...state.users.map(user => {
                    if (user._id === action.payload.userFollowingID) {
                        const idCurrentUser = user.followers.indexOf(action.payload.currentUserID)
                        user.followers = [...user.followers.slice(0,idCurrentUser), ...user.followers.slice(idCurrentUser + 1)]
                    }
                    return user
                })]
            }
        }

        default: {
            return state
        }

    }

}