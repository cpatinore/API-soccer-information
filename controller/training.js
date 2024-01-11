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
        [req.body.week, id.rows[0].id, data[index].player]
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

module.exports = {
  addTraining,
};
