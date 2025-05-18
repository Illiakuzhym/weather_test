const request = require('supertest');
const app = require('../src/app');
const { sequelize, Subscription } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Weather subscription flow', () => {
  let token = '';

  test('should subscribe with valid data', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .send('email=test@example.com&city=Kyiv&frequency=daily')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Confirmation email sent/);

    const sub = await Subscription.findOne({ where: { email: 'test@example.com' } });
    expect(sub).not.toBeNull();
    token = sub.token; // Save token for next steps
  });

  test('should return 409 for duplicate subscription', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .send('email=test@example.com&city=Kyiv&frequency=daily')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(res.statusCode).toBe(409);
  });

  test('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .send('email=invalid&city=Kyiv&frequency=daily')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(res.statusCode).toBe(400);
  });

  test('should confirm subscription with valid token', async () => {
    const res = await request(app)
      .get(`/api/confirm/${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/confirmed successfully/);

    const sub = await Subscription.findOne({ where: { token } });
    expect(sub.confirmed).toBe(true);
  });

  test('should return 404 for invalid confirmation token', async () => {
    const res = await request(app)
      .get(`/api/confirm/invalid-token`);

    expect(res.statusCode).toBe(404);
  });

  test('should unsubscribe with valid token', async () => {
    const res = await request(app)
      .get(`/api/unsubscribe/${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Unsubscribed successfully/);

    const sub = await Subscription.findOne({ where: { token } });
    expect(sub).toBeNull();
  });

  test('should return 404 for invalid unsubscribe token', async () => {
    const res = await request(app)
      .get(`/api/unsubscribe/bad-token`);

    expect(res.statusCode).toBe(404);
  });
});
