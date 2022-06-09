const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

/* The Map object holds key-value pairs and remembers the original insertion order of the keys.
Any value (both objects and primitive values) may be used as either a key or a value. */
const launches = new Map;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('January 20, 2030'),
    target: 'Kepler-442 b',
    custumers: ['Space-N', 'NASA'],
    upcoming: true,
    success: true
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);
// To access a specific launch (100) =>
// launches.get(100);

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');
    
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}
// find returns a list of documents that matchs our filter object 

async function getAllLaunches() {
    return await launchesDatabase
        .find({}, {'_id': 0, '__v': 0 });
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found!');
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch , {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        custumers: ['Space-N', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}
// Saving our clients from having to send us all of this data that can be determined on the server side.
// The user only needs to send us the other 4 fields that make our mission unique.

async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
};