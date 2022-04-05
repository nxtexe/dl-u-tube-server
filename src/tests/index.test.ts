import request from 'supertest';
import AppServer from '@AppServer';
import '../app'; // import side effects so app gets initialised

describe('Test the root route', () => {
    const server = AppServer.instance;
    beforeAll(() => {
        server.open();
    });
    test("It should respond with status code 200 from the GET method", async () => {
        const response = await request(server.app).get('/');
        expect(response.statusCode).toBe(200);
    });
    afterAll(async () => {
        await server.close();
    });
});