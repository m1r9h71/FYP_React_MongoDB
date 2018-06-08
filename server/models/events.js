const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    eventname:{
        type: String,
        required: true,
    },
    eventlocation:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    startdate:{
        type: Date,
        required: true,
    },
    finishdate:{
        type: Date,
        required: true,
    },

    status:{
        type: String,
        required: true,
    },
    invitedId: {
        type: String
    }


},{timestamps:true})


const Event = mongoose.model('Event', eventSchema)

module.exports = { Event }