require('dotenv').config();

const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

exports.createItemGet = (req, res) => {
  const name = req.params.name;
  res.render('createItem', { name });
};

exports.createItemPost = async (req, res) => {
  const category = req.params.name;
  const { name, price, count } = req.body;
  await sql(
    `INSERT INTO items(name,price,createdat,updatedat,count,category_name) VALUES('${name}',${price},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,${count},'${category}')`
  );
  res.redirect(`/category/${category}/view-items`);
};

exports.updateItemGet = (req, res) => {
  const catName = req.params.name;
  const oldName = req.params.oldname;
  res.render('updateItem', { category: catName, updateName: oldName });
};

exports.updateItemPost = async (req, res) => {
  const { name, count } = req.body;
  const category = req.params.name;
  const oldName = req.params.oldname;
  await sql(`UPDATE items
    SET name='${name}',count=${count}, updatedat=CURRENT_TIMESTAMP
    WHERE name='${oldName}'  
    `);
  res.redirect(`/category/${category}/view-items`);
};

exports.deleteItem = async (req, res) => {
  const { name, category } = req.params;
  await sql(`DELETE FROM items WHERE name='${name}'`);
  res.redirect(`/category/${category}/view-items`);
};
