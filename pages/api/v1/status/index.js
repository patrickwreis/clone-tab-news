import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const resultPostgresVersion = await database.query("SHOW server_version;");
  const resultMaxConnection = await database.query("SHOW max_connections;");

  const databaseName = process.env.POSTGRES_DB;
  const resultOpenedConnection = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });

  response.status(200).json({
    update_at: updateAt,
    database: {
      dependencies: {
        version: resultPostgresVersion.rows[0].server_version,
        max_connections: parseInt(resultMaxConnection.rows[0].max_connections),
        opened_connections: resultOpenedConnection.rows[0].count,
      },
    },
  });
}

export default status;
