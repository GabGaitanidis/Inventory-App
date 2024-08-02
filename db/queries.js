const client = require("./client");

async function getCategories() {
  const result = await client.query("SELECT * FROM CATEGORIES");
  return result.rows;
}
async function getItems() {
  const result = await client.query(
    "SELECT items.name, items.id ,CATEGORIES.name AS category FROM items JOIN CATEGORIES ON items.type_id = CATEGORIES.id;"
  );
  return result.rows;
}
async function getEach(id) {
  const result = await client.query(
    `SELECT items.name, items.id FROM items JOIN CATEGORIES ON items.type_id = CATEGORIES.id WHERE CATEGORIES.id = ($1)`,
    [id]
  );
  return result.rows;
}
async function getCategoryById(id) {
  const result = await client.query("SELECT * FROM CATEGORIES WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}
async function addCategory(name) {
  const result = await client.query(
    "INSERT INTO CATEGORIES (name) VALUES ($1)",
    [name]
  );
  return result.rows[0];
}
async function addItem(name, id) {
  const result = await client.query(
    "INSERT INTO items (name, type_id) VALUES ($1, $2)",
    [name, id]
  );
  return result.rows;
}

async function updateItem(name, id) {
  const result = await client.query(
    "UPDATE items SET name = $1 WHERE id = $2",
    [name, id]
  );
  return result.rows[0];
}
async function updateCategory(name, id) {
  const result = await client.query(
    "UPDATE CATEGORIES SET name = $1 WHERE id = $2",
    [name, id]
  );
  return result.rows;
}
async function deleteItem(id) {
  const result = await client.query("DELETE FROM items WHERE id = $1", [id]);
  return result.rows[0];
}
async function deleteAllItems(type_id) {
  const result = client.query("DELETE FROM items WHERE type_id = $1", [
    type_id,
  ]);
  return result.rows;
}
async function deleteCateogry(id) {
  await deleteAllItems(id);
  const result = client.query("DELETE FROM CATEGORIES WHERE id = $1", [id]);
  return result.rows;
}
module.exports = {
  getCategories,
  getEach,
  addCategory,
  addItem,
  updateItem,
  deleteItem,
  deleteCateogry,
  getItems,
  updateCategory,
  getCategoryById,
};
