export default function(state={},action){
    switch(action.type){
        case 'USER_LOGIN':
            return {...state, login: action.payload}
        case 'USER_AUTH':
            return{...state, login: action.payload}
        case 'GET_USER_EVENTS':
            return{...state, userEvents: action.payload}
        case 'GET_USERS':
            return{...state, users: action.payload}
        case 'GET_ONE_USER':
            return{...state, users: action.payload}
        case 'UPDATE_USER':
            return{
                ...state,
                updateUser: action.payload.success,
                users:action.payload.doc
            }
        case 'DELETE_USER':
            return{
                ...state,
                userDeleted: action.payload
            }
        case 'CLEAR_USER':
            return{
                ...state,
                updateUser: action.payload.updateUser,
                users: action.payload.user,
                userDeleted: action.payload.userDeleted
            }
        case 'USER_REGISTER':
            return {
                ...state,
                register: action.payload.success,
                users: action.payload.users
            }

        default:
            return state;
    }
}