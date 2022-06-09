/* If we're running these tests very often, we would want to create a specific database
    for our test data and seperate out a production database that we use for our real 
    life launches. */

// supertest is the tool that makes requests against our APIs
const request = require('supertest');
const app = require('../../app');
const { 
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo');

<<<<<<< HEAD
describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'Test Entreprise',
        rocket: 'Nidhal-117',
        target: 'Kepler-554 F',
        launchDate: 'January 20, 2026'
    };

    const launchDataWithoutDate = {
        mission: 'Test Entreprise',
        rocket: 'Nidhal-117',
        target: 'Kepler-554 F'
    };

    const launchDataWithInvalidDate = {
        mission: 'Test Entreprise',
        rocket: 'Nidhal-117',
        target: 'Kepler-554 F',
        launchDate: 'Hellooooo'
    };

    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf(); // Converting date from STRING format to NUMERICAL format
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate); // Matches an object PARTIALLY
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
        
        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        });
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
        
        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        });
    });
});
=======
// Settin' up an environment for our tests
describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    }); // whatever in this callback will run once to set up all the tests that come after

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });
    
    describe('Test POST /launches', () => {
        const completeLaunchData = {
            mission: 'Test Entreprise',
            rocket: 'Nidhal-117',
            target: 'Kepler-62 f',
            launchDate: 'January 20, 2026'
        };
    
        const launchDataWithoutDate = {
            mission: 'Test Entreprise',
            rocket: 'Nidhal-117',
            target: 'Kepler-62 f'
        };
    
        const launchDataWithInvalidDate = {
            mission: 'Test Entreprise',
            rocket: 'Nidhal-117',
            target: 'Kepler-62 f',
            launchDate: 'Hellooooo'
        };
    
        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf(); // Converting date from STRING format to NUMERICAL format
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(launchDataWithoutDate); // Matches an object PARTIALLY
        });
    
        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
            
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            });
        });
    
        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);
            
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date'
            });
        });
    });
});
>>>>>>> main
