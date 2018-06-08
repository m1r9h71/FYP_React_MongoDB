import { combineReducers } from 'redux';
import events from './events_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    events,
    user
});

export default rootReducer;