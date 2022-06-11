const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

// connection Property : event emitter that emits events when connection is ready (if succeded)
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});
// Or when there is errors
mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}