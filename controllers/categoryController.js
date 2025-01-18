require('dotenv').config();

const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

const addToCategory = async (username, nOfItems) => {
  const result = await sql(
    `INSERT INTO category(name, createdAt, updatedAt, numberOfItems) 
        VALUES ('${username}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ${nOfItems});`
  );
};

const viewCategory = async () => {
  const result = await sql(`SELECT name,numberOfItems FROM category`);
  return result;
};

const updateCategory = async (name, nOfItems, oldName) => {
  await sql(`UPDATE category
    SET name='${name}', numberOfItems='${nOfItems}',updatedat=CURRENT_TIMESTAMP
    WHERE name='${oldName}'
    `);
};

const deleteCategory = async (name) => {
  await sql(`DELETE FROM category 
    WHERE name='${name}'
    `);
};
exports.getCategoryList = async (req, res) => {
  const data = await viewCategory();
  res.render('categoryView', { data });
};

exports.getItemsList = async (req, res) => {
  const data = await sql(`SELECT name,price,count FROM items`);
  const catName = req.params.name;
  res.render('itemView', { items: data, name: catName });
};

exports.createCatRender = (req, res) => {
  res.render('categoryForm');
};

exports.createCatPost = async (req, res) => {
  const { name, numberOfItems } = req.body;
  await addToCategory(name, numberOfItems);
  res.redirect('/category');
};

exports.createUpdateRender = (req, res) => {
  const oldName = req.query.name;
  res.render('updateCatForm', { name: oldName });
};
exports.updateCategoryPut = async (req, res) => {
  const { name, numberOfItems } = req.body;
  const oldName = req.params.name;
  await updateCategory(name, numberOfItems, oldName);
  res.redirect('/category');
};

exports.deleteCategory = async (req, res) => {
  const name = req.params.name;
  await deleteCategory(name);
  res.redirect('/category');
};
