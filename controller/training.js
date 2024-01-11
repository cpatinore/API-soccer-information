const { connectDB, client } = require("../database/conect");

async function addTraining(req, res) {
  try {
    const data = req.body.infoPlayers;
    console.log(req.body);
    for (const index in data) {
      let query =
        "WITH player_performance AS (INSERT INTO player_performance(power, speed, passes) VALUES ($1, $2, $3) ON CONFLICT (power, speed, passes) DO NOTHING RETURNING *)SELECT id FROM player_performance;";
      let values = [data[index].power, data[index].speed, data[index].passes];

      const id = await client.query(query, values);
      await client.query(
        "INSERT INTO training(training, week, performance, player) VALUES ($1, $2, $3, $4)",
        [req.body.training, req.body.week, id.rows[0].id, index]
      );
      break;
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
    const result = await client.query(
      "SELECT COUNT(training) FROM training WHERE week = $1",
      [week]
    );

    if (result.rows[0].count == 3) {
      return res.json(result.rows);
    } else return res.json({ message: "No hay suficiente información." });
  } catch (error) {
    console.log(error.message);
    return { message: "Guardado fallido" };
  }
}

module.exports = {
  getMainTeam,
  addTraining,
};
