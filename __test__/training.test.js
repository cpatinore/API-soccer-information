const request = require('supertest')
const app = require('../app')

describe('Save training', () => {
  it('', async () => {
    const res = await request(app)
      .post('/api/training')
      .send({
        "week": "20231",
        "infoPlayers": [
          {
            "player": "Jugador1",
            "power": 10,
            "speed": 5,
            "passes": 25
          },
          {
            "player": "Jugador2",
            "power": 16,
            "speed": 3,
            "passes": 30
          },
          {
            "player": "Jugador3",
            "power": 15,
            "speed": 1,
            "passes": 25
          },
          {
            "player": "Jugador4",
            "power": 12,
            "speed": 4,
            "passes": 18
          },
          {
            "player": "Jugador5",
            "power": 11,
            "speed": 3,
            "passes": 19
          },
          {
            "player": "Jugador6",
            "power": 9,
            "speed": 3,
            "passes": 22
          },
          {
            "player": "Jugador7",
            "power": 10,
            "speed": 2,
            "passes": 24
          }
        ]
      })
    expect(res.statusCode).toEqual(200);
    expect(res.get('Content-Type')).toMatch(/json/);
    
  })
})
