const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategoryList);
categoryRouter.get('/view-items', categoryController.getItemsList);
categoryRouter.get('/category-new', categoryController.createCatRender);
categoryRouter.post('/category-new', categoryController.createCatPost);
categoryRouter.get('/get-update-form', categoryController.createUpdateRender);
categoryRouter.post(
  '/:name/category-update',
  categoryController.updateCategoryPut
);
categoryRouter.post('/:name/category-del', categoryController.deleteCategory);

module.exports = categoryRouter;
