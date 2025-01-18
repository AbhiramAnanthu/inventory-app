const { Router } = require('express');
const itemController = require('../controllers/itemController');
const itemRouter = Router();

// item crud
itemRouter.get('/:name/create-item', itemController.createItemGet);
itemRouter.post('/:name/create-item', itemController.createItemPost);
itemRouter.get('/:name/:oldname/update-item', itemController.updateItemGet);
itemRouter.post('/:name/:oldname/update-item', itemController.updateItemPost);
itemRouter.post('/:name/:category/delete-item', itemController.deleteItem);
module.exports = itemRouter;
