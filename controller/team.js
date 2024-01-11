const { client } = require("../database/conect");

async function getMainTeam(req, res) {
  try {
    const week = req.params.week;
    const players = req.params.players ? req.params.players : 5;

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
        GROUP BY player ORDER BY score DESC LIMIT $2`,
        [week, players]
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
};
