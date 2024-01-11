const { client } = require("../database/conect");

const getMainTeam = async (req, res) => {
  try {
    await client.connect().catch((error) => {
      console.error("Error al conectar a PostgreSQL:", error.message);
    });

    const result = await client.query("SELECT * FROM training");
    client.end();
    return res.json(result.rows);
  } catch (error) {
    return { message: "Guardado fallido" };
  }
};

module.exports = {
  getMainTeam,
};
