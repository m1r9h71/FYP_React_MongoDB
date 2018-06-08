import axios from 'axios';

export function getEvents(
    limit = 10,
    start = 0,
    order = 'asc',
    list =  ''
){

    const request = axios.get(`/api/getevents?limit=${limit}&skip=${start}&order=${order}`)
        .then(response => {
                 if(list){
                     return [...list,...response.data]
                 }else {
                    return response.data
               }

            }
        )

    return{
        type:'GET_EVENTS',
        payload: request
    }
}

export function getEventWithInvited(id) {
    const request = axios.get(`/api/getOneEvent?id=${id}`)

    return (dispatch) =>{
        request.then(({data})=> {
            let event = data;

            axios.get(`/api/user_invites?id=${event.invitedId}`)
                .then(({data})=>{

                    let response = {
                        event,
                        invited: data
                    }

                    dispatch({
                        type: 'GET_EVENT_WITH_INVITED',
                        payload: response
                    })

                })


        })
    }


}

export function clearEventwithInvited() {
    return {
        type: 'CLEAR_EVENT_WITH_INVITED',
        payload: {
            event:{},
            invited:{}
            }
        }
    }
    export function addEvent(event){

        const request = axios.post('/api/event', event)
            .then(response => response.data);

        return {
            type: 'ADD_EVENT',
            payload: request
        }

    }

    export function clearNewEvent() {
            return {
                type: 'CLEAR_NEWBOOK',
                payload: {}
            }
    }

    export function getUserEvents(userId){
            const request = axios.get(`/api/user_events?user=${userId}`)
                .then(response => response.data)
            return {
                type: 'GET_USER_EVENTS',
                payload:request
            }

    }

    export function getEvent(id){
        const request = axios.get(`/api/getOneEvent?id=${id}`)
            .then(response => response.data);

        return {
            type: 'GET_EVENT',
            payload: request
        }



    }

    export function deleteEvent(id){
        const request = axios.delete(`/api/delete_event?id=${id}`)
            .then(response => response.data)

        return {
            type: 'DELETE_EVENT',
            payload: request
        }

    }

    export function clearEvent(){
        return{
            type: 'CLEAR_EVENT',
            payload: {
                event:{},
                updateEvent:false,
                postDeleted:false
            }
        }
    }

    export function updateEvent(data){
            const request = axios.patch(`/api/event_update`, data)
                .then(response => response.data);

            return {
                type: 'UPDATE_EVENT',
                payload: request
            }
    }





    /*=================USER STUFF=================================*/

    export function loginUser({email,password}){
        const request = axios.post('/api/login', {email, password})
            .then(response => response.data)
        return {
            type: "USER_LOGIN",
            payload: request
        }
    }

    export function auth() {
        const request = axios.get('/api/auth')
            .then(response => response.data);


        return {
            type: 'USER_AUTH',
            payload: request
        }
    }

    export function getOneUser(id){
        const request = axios.get(`/api/getOneUser?id=${id}`)
            .then(response => response.data );

        return{
            type: 'GET_ONE_USER',
            payload: request
        }
    }

    export function updateUser(data){
        const request = axios.patch(`/api/user_update`, data)
            .then(response => response.data);

        return {
            type: 'UPDATE_USER',
            payload: request
        }
    }

    export function deleteOneUser(id){
        const request = axios.delete(`/api/delete_user?id=${id}`)
            .then(response => response.data)

        return {
            type: 'DELETE_USER',
            payload: request
        }
    }

    export function clearUser(){
        return{
            type: 'CLEAR_USER',
            payload:{
                users:null,
                updateUser: false,
                userDeleted:false
            }
        }
    }

    export function getUsers() {
        const request = axios.get('/api/users')
            .then(response => response.data);

        return{
            type: 'GET_USERS',
            payload: request
        }
    }

    export function userRegister(user, userList) {
        const request = axios.post(`/api/register`, user)

        return(dispatch) =>{
            request.then(({data})=>{
                let users = data.success ? [...userList, data.user]: userList;
                let response = {
                    success: data.success,
                    users
                }
                dispatch({
                    type: 'USER_REGISTER',
                    payload: response
                })
            })
        }
    }