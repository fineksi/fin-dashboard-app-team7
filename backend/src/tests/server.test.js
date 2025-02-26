const test = require('ava');
const request = require('supertest');
const Express = require('express');
const Routes = require('../routes.js');
require('dotenv').config();

// Setup sebelum semua test dijalankan
test.serial.before(async (t) => {
    const app = Express();
    process.env.API_PREFIX = 'v1';
    app.use(`/${process.env.API_PREFIX}/`, Routes);
    t.context.app = app;
});

// Test menggunakan AVA langsung
test.serial('should return 200 on a valid API request', async (t) => {
    const response = await request(t.context.app).get(`/${process.env.API_PREFIX}/ping`);
    t.is(response.status, 200);
});
