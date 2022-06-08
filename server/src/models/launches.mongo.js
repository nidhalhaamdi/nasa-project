const mongoose = require('mongoose');

// Schema :: how we talk to our mongo database
// storing the schema defining the shape of our launches
const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    custumers: [String],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
});

// Creating a model with this schema typing the name of our collection (Launch)
// connects launchesSchema with the launches Collection

module.exports = mongoose.model('Launch', launchesSchema);

/* LaunchesSchema is assigned to Launch's Collection !
This first argument here should always be the singular name of the collection that this model represents.
Mongoose will then take what you pass in, lower case it, make it plural and talk to the collection with
that lowercase plural name. */