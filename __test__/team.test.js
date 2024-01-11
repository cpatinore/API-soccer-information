const request = require('supertest')
const app = require('../app')

describe('Main team', () => {
  it('', async () => {
    const res = await request(app).get('/api/team/20231/');
    expect(res.statusCode).toEqual(200);
    expect(res.get('Content-Type')).toMatch(/json/);
  })
})