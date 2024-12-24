test("GET to /api/v1/status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(parsedUpdateAt).toBe(responseBody.update_at);

  expect(responseBody.database.dependencies.version).toBe("16.6");
  expect(parseInt(responseBody.database.dependencies.max_connections)).toBe(
    100,
  );
  expect(parseInt(responseBody.database.dependencies.opened_connections)).toBe(
    1,
  );
});
