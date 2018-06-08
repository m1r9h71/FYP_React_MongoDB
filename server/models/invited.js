const mongoose = require('mongoose');

const invitedSchema = mongoose.Schema({
    eventId: {
        type: String
    },
    usersInvited: {
        id: []
    }
})



const Invited = mongoose.model('Invited', invitedSchema)

module.exports = { Invited }