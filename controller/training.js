const { client } = require("../database/conect");

async function addTraining(req, res) {
  try {
    const data = req.body.infoPlayers;
    for (const index in data) {
      let query = `INSERT INTO player_performance(power, speed, passes) 
      VALUES ($1, $2, $3) ON CONFLICT (power, speed, passes) DO NOTHING RETURNING id`;

      let values = [data[index].power, data[index].speed, data[index].passes];
      let id = await client.query(query, values);

      if (!id.rows.lenght > 0) {
        id = await client.query(
          "SELECT id FROM player_performance WHERE power = $1 AND speed = $2 AND passes = $3",
          values
        );
      }
      await client.query(
        "INSERT INTO training(week, performance, player) VALUES ($1, $2, $3)",
        [req.body.week, id.rows[0].id, index + 1]
      );
    }
    return res.json({ message: "La información ha sido guardada con exito." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message:
        "No ha sido posible guardar la información. Por favor, revise los datos.",
    });
  }
}

async function getMainTeam(req, res) {
  try {
    const week = req.params.week;
    const search = await client.query(
      `SELECT MAX(training) FROM (
        SELECT COUNT(week) training FROM training WHERE week = $1 GROUP BY player
        ) training_info`,
      [week]
    );

    if (search.rows[0].max == 3) {
      let result = await client.query(
        `SELECT 'Jugador' || player::integer AS Player, sum(power) * 0.2 + sum(speed) * 0.3 + sum(passes) * 0.5 as score 
        FROM training INNER JOIN player_performance as play ON performance = play.id WHERE week = $1 
        GROUP BY player ORDER BY score DESC LIMIT 5`,
        [week]
      );
      return res.json(result.rows);
    } else return res.json({ message: "No hay suficiente información." });
  } catch (error) {
    console.log(error.message);
    return {
      message:
        "Ocurrio un error al momento de consultar la información. Por favor valida la información ingresada",
    };
  }
}

module.exports = {
  getMainTeam,
  addTraining,
};
