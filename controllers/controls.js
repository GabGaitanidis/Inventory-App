const db = require("../db/queries");

async function displayGenres(req, res, next) {
  const categories = await db.getCategories();
  res.render("categories", { categories });
}
async function displayIndex(req, res) {
  const categories = await db.getCategories();
  const items = await db.getItems();

  res.render("index", { categories, items });
}
async function displayEachGenre(req, res, next) {
  const { id } = req.params;
  const cat = await db.getCategoryById(id);
  console.log(cat.name);
  const result = await db.getEach(id);
  res.render("cat", { c: cat, category: result });
}
async function displayEditCat(req, res) {
  const { catId } = req.params;

  res.render("editFormCat", { catId: catId });
}
async function editCatPost(req, res) {
  const { editCat } = req.body;
  const { catId } = req.params;
  await db.updateCategory(editCat, catId);
  res.redirect("/");
}
async function handleAddCategory(req, res, next) {
  try {
    const { name } = req.body;
    await db.addCategory(name);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
}

async function displayFormCat(req, res) {
  res.render("formCat");
}

async function numOfCategories(req, res) {
  const categories = await db.getCategories();
  res.render("formItem", { items: categories });
}

async function handleAddItem(req, res) {
  const { itemName } = req.body;
  const { categoryId } = req.body;
  await db.addItem(itemName, categoryId);
  res.redirect("/");
}
async function handleGetUpdate(req, res) {
  const { itemId } = req.params;
  res.render("editForm", { itemId: itemId });
}
async function handlePostUpdate(req, res) {
  const { editName } = req.body;
  const { itemId } = req.params;
  await db.updateItem(editName, itemId);
  res.redirect("/");
}

async function handleDeleteItem(req, res) {
  const { id } = req.params;
  await db.deleteItem(id);
  res.redirect("/");
}

async function handleDeleteCategory(req, res) {
  const { password } = req.body;
  if (password == process.env.SECRETPASSWORD) {
    const { id } = req.params;
    await db.deleteCateogry(id);
    res.render("goBack", { isAuth: "Category deleted" });
  } else {
    res.render("goBack", { isAuth: "Wrong Password" });
  }
}
module.exports = {
  displayGenres,
  displayEachGenre,
  displayFormCat,
  handleAddCategory,
  numOfCategories,
  handleAddItem,
  handleGetUpdate,
  handlePostUpdate,
  handleDeleteItem,
  handleDeleteCategory,
  displayIndex,
  displayEditCat,
  editCatPost,
};
