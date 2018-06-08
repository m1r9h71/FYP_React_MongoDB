import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions';
import EventItem from '../WidgetsUI/event_item';
import { Redirect } from 'react-router-dom';
class HomeContainer extends Component {

    componentWillMount(){
        this.props.dispatch(getEvents(1, 0, 'desc'))

    }

    renderItems = (events) => (
        events.list ?
            events.list.map( item => (
                <EventItem {...item} key={item._id}/>
            ))
            :null
    )

    loadmore = () => {
        let count = this.props.events.list.length;
        this.props.dispatch(getEvents(1, count, 'desc', this.props.events.list))
    }

    render() {
        return(
            <div>
                {this.renderItems(this.props.events)}
                <div className="loadmore"
                onClick={this.loadmore}
                >Load More</div>
            </div>
        );


    }
}

function mapStateToProps(state){
    return {
        events: state.events
    }
}

export default connect(mapStateToProps)(HomeContainer);