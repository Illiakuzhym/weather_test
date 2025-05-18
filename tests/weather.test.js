const request = require('supertest');
const app = require('../src/app');

describe('GET /api/weather', () => {
  test('should return weather data for a valid city', async () => {
    const res = await request(app)
      .get('/api/weather?city=Kyiv');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('humidity');
    expect(res.body).toHaveProperty('description');
  });

  test('should return 400 if city is missing', async () => {
    const res = await request(app)
      .get('/api/weather');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('should return 404 if city is invalid', async () => {
    const res = await request(app)
      .get('/api/weather?city=INVALIDCITYNAME123');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
