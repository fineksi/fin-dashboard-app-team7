const request = require('supertest');
const Express = require('express');
const Routes = require('../routes.js');
require('dotenv').config();

describe('Server tests', () => {
  let app;

  beforeAll(() => {
    app = Express();
    process.env.API_PREFIX = 'v1';
    app.use(`/${process.env.API_PREFIX}/`, Routes);
  });

  test('should return 200 on a valid API request', async () => {
    const response = await request(app).get(`/${process.env.API_PREFIX}/ping`);
    expect(response.status).toBe(200);
  });
});
