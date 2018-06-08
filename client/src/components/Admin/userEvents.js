import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserEvents } from '../../actions';
import moment from 'moment-js';
//import { Link } from 'react-router-dom';




class UserEvents extends Component {

    componentWillMount(){
        this.props.dispatch(getUserEvents(this.props.user.login.id))
    }

    showUserEvents = (user) => (
        user.userEvents ?
             user.userEvents.map(item => (
                 <tr key={item._id}>
                     <td>{item.eventname}</td>
                     <td>{item.eventlocation}</td>
                     <td>{item.description}</td>
                     <td>{moment(item.startdate).format("DD/MM/YY")}</td>
                     <td>{moment(item.finishdate).format("DD/MM/YY")}</td>
                     <td>{item.status}</td>
                 </tr>
            ))

            :null
    )


    render() {
        let user = this.props.user;
        return (
            <div className="user_posts">
                <h4>Your Events:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Location</th>
                            <th>Event Description</th>
                            <th>Start Date</th>
                            <th>Finish Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.showUserEvents(user)}
                    </tbody>
                </table>

            </div>
        );

    }
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserEvents)