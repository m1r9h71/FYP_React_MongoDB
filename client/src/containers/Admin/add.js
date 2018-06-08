import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEvent, clearNewEvent } from '../../actions';
import { getUsers } from '../../actions';
import { Redirect } from 'react-router-dom';



class AddEvent extends Component {
    constructor(props){
        super(props);
    this.state = {
        formdata: {
            eventname: '',
            eventlocation: '',
            description: '',
            startdate: '',
            finishdate: '',
            status: '',
            //invitedUserId: ''

        },isInvited: ''

    };
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }
    componentWillMount(){
        this.props.dispatch(getUsers())

    }


    handleInput = (event, name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value

        this.setState({
            formdata:newFormdata
        })
    }




    showNewEvent = (event) => (
        event.post ?
            <div className="conf_link">
                Event Added <Link to={`/events/${event.eventId}`}>
                Click the link to see the post

            </Link>

            </div>
            :null

    )

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addEvent({
            ...this.state.formdata,
            invitedId: this.props.user.login.id,
            isInvited: this.props.value


        }))
    }

    handleCheckbox = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked:
            target.value;

        const name = target.name;

        this.setState({

            [name]: value

        });
    }

    componentWillUnmount() {
        this.props.dispatch(clearNewEvent())

}
    showUsers = (user) => (
        user.users ?
            user.users.map(item => (
                <tr key={item._id}>
                    <td> {item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.course}</td>
                    <td><input
                        type="checkbox"
                        name="isInvited"
                        value={item._id}
                        checked={this.props.value.isInvited}
                        onChange={(event)=>this.handleCheckbox(event)}/></td>
                </tr>
            ))

            :null
    )




    render() {
        let user = this.props.user;
        //console.log(this.props.user);
       if(this.props.user.login.role === 1) {
            return (
                <div className="rl_container event">
                    <form onSubmit={this.submitForm}>
                        <h2>Add an Event</h2>

                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter Event Name"
                                value={this.state.formdata.eventname}
                                onChange={(event) => this.handleInput(event, 'eventname')}
                            />
                        </div>

                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter Location"
                                value={this.state.formdata.eventlocation}
                                onChange={(event) => this.handleInput(event, 'eventlocation')}
                            />
                        </div>

                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter Event Description"
                                value={this.state.formdata.description}
                                onChange={(event) => this.handleInput(event, 'description')}
                            />

                        </div>

                        <div className="form_element">
                            <input
                                type="date"
                                placeholder="Enter Event Starting Date"
                                value={this.state.formdata.startdate}
                                onChange={(event) => this.handleInput(event, 'startdate')}
                            />

                        </div>

                        <div className="form_element">
                            <input
                                type="date"
                                placeholder="Enter Event Finish Date"
                                value={this.state.formdata.finishdate}
                                onChange={(event) => this.handleInput(event, 'finishdate')}
                            />

                        </div>

                        <div className="form_element">
                            <select
                                value={this.state.formdata.status}
                                onChange={(event) => this.handleInput(event, 'status')}
                            >
                                <option val="O">Open</option>
                                <option val="C">Closed</option>

                            </select>
                        </div>


                        <div className="current_users">
                            <h4>Current Users: </h4>
                            <table>
                                <thead>
                                <tr>

                                    <th>Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Invite</th>
                                </tr>
                                </thead>
                                <tbody>

                                {this.showUsers(user)}

                                </tbody>
                            </table>





                        </div>

                        <button type="submit">Add an Event</button>
                        {
                            this.props.events.newevent ?
                                this.showNewEvent(this.props.events.newevent)
                                : null
                        }
                    </form>
                </div>
            );
        }else {
            return <Redirect to="/user" />
        }
    }
}

function mapStateToProps(state){

    return {
        events:state.events
    }
}

export default connect(mapStateToProps)(AddEvent)

/*id: this.showUsers(user.item._id),
    name: this.showUsers(user.item.name),
    lastname: this.showUsers(user.item.lastname),
    email: this.showUsers(user.item.email),
    course: this.showUsers(user.item.course)*/

/*<td><input
                        type='checkbox'
                        id='selected'
                        value={this.state.formdata.isInvited}
                        onChange={event => this.handleInput(event, 'isInvited')}/></td>*/

/* <table>
                               <thead>
                               <tr>

                                   <th>Name</th>
                                   <th>Last Name</th>
                                   <th>Email</th>
                                   <th>Course</th>
                               </tr>
                               </thead>
                               <tbody>

                               {this.showUsers(user)}

                               </tbody>
                           </table>*/