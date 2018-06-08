import React from 'react';
import { Link } from 'react-router-dom';

const EventItem = (item) => {
    return (
        <Link to={`/events/${item._id}`} className="event_item">
            <div className="event_header">
                <h2>{item.eventname}</h2>
            </div>
            <div className="event_items">{item.description}
            </div>
            <div className="event_bubble">
                <strong>Event Location</strong> {item.eventlocation}
                </div>
            <div className="event_bubble">
                <strong>Starting Date</strong> {item.startdate}
                </div>
            <div className="event_bubble">
                <strong>Finish Date</strong> {item.finishdate}
                </div>
            <div className="event_bubble status">
                <strong>Event Status</strong> {item.status}
                </div>


        </Link>
    );
};



export default EventItem;