import React, { Component } from 'react';
import { getEventWithInvited,  clearEventwithInvited} from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class EventView extends Component {

    componentWillMount(){
        this.props.dispatch(getEventWithInvited(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearEventwithInvited())
    }



    renderEvent = (events) => (
        events.event ?
            <div className="ei_container">
                <div className="ei_header">
                    <h2><Link to={`/user/edit-event/${events.event._id}`}>{events.event.eventname}</Link></h2>
                        <h5>{events.event.eventlocation}</h5>
                    <div className="ei_invited">
                        {events.event.description}

                    </div>
                    <span>Event Created By:</span> {events.invited.name} {events.invited.lastname}
                </div>
                    <div className="ei_invite">

                    </div>
                </div>

            :null
    )



    render() {
        let events = this.props.events;
        return (
            <div>

                {this.renderEvent(events)}


            </div>
        );
    }
}



function mapStateToProps(state){
    return {
        events: state.events

    }
}


export default connect(mapStateToProps)(EventView)
// <span>Invited To Event:</span> {events.invited.name} {events.invited.lastname}