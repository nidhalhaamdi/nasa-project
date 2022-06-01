/* The Map object holds key-value pairs and remembers the original insertion order of the keys.
Any value (both objects and primitive values) may be used as either a key or a value. */
const launches = new Map;

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('January 20, 2030'),
    target: 'Kepler-442 b',
    custumer: ['Space-N', 'NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);
// To access a specific launch (100) =>
// launches.get(100);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}
// a function that takes no parameter
// returns the launches in the format needed by our controller

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch, {
            success: true,
            upcoming: true,
            custumer: ['Space-N', 'NASA'],
            flightNumber: latestFlightNumber
        }));
}
// Saving our clients from having to send us all of this data that can be determined on the server side.
// The user only needs to send us the other 4 fields that make our mission unique.

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
};