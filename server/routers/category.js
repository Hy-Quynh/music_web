const express =  require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.post('/', categoryController.createCategoty);
router.put('/:categoryId', categoryController.updateCategoty);
router.delete('/:categoryId', categoryController.deleteCategoty);

module.exports = router;