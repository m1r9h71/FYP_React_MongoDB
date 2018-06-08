import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEvent, updateEvent, clearEvent, deleteEvent } from '../../actions';

class EditEvent extends PureComponent {

    state = {
        formdata: {
            _id: this.props.match.params.id,
            eventname: '',
            eventlocation: '',
            description: '',
            startdate: '',
            finishdate: '',
            status: ''
        }
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



    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateEvent(this.state.formdata))

    }

    deletePost= () => {
        this.props.dispatch(deleteEvent(this.props.match.params.id))
    }

    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/')
        }, 1000)
    }

    componentWillMount(){
        this.props.dispatch(getEvent(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        let event = nextProps.events.event;
        this.setState({
            formdata:{
                _id: event._id,
                eventname: event.eventname,
                eventlocation: event.eventlocation,
                description: event.description,
                startdate: event.startdate,
                finishdate: event.finishdate,
                status: event.status
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearEvent())
    }

    render() {
        let events = this.props.events;
        return (
            <div className="rl_container event">
                {
                    events.updateEvent ?
                        <div className="edit_confirm">
                            post updated , <Link to={`/events/${events.event._id}`}>
                            Click here to see your post
                        </Link>
                        </div>
                        :null
                }
                {
                    events.postDeleted ?
                        <div className="red_tag">
                            Event Deleted
                            {this.redirectUser()}
                        </div>
                        :null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit an Event</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Event Name"
                            value={this.state.formdata.eventname}
                            onChange={(event)=>this.handleInput(event,'eventname')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Location"
                            value={this.state.formdata.eventlocation}
                            onChange={(event)=>this.handleInput(event,'eventlocation')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Event Description"
                            value={this.state.formdata.description}
                            onChange={(event)=>this.handleInput(event, 'description')}
                        />

                    </div>

                    <div className="form_element">
                        <input
                            type="date"
                            placeholder="Enter Event Starting Date"
                            value={this.state.formdata.startdate}
                            onChange={(event)=>this.handleInput(event, 'startdate')}
                        />

                    </div>

                    <div className="form_element">
                        <input
                            type="date"
                            placeholder="Enter Event Finish Date"
                            value={this.state.formdata.finishdate}
                            onChange={(event)=>this.handleInput(event, 'finishdate')}
                        />

                    </div>

                    <div className="form_element">
                        <select
                            value={this.state.formdata.status}
                            onChange={(event)=>this.handleInput(event, 'status')}
                        >
                            <option val="O">Open</option>
                            <option val="C">Closed</option>

                        </select>


                    </div>

                    <button type="submit">Edit an Event</button>
                    <div className="delete_post">
                        <div className="button"
                          onClick={this.deletePost}
                        >
                            Delete Event
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){

    return {
        events:state.events
    }
}

export default connect(mapStateToProps)(EditEvent)