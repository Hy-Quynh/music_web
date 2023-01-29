const express =  require('express');
const singerController = require('../controllers/singer');
const router = express.Router();

router.get('/', singerController.getAllSinger);
router.post('/', singerController.createSinger);
router.put('/:singerId', singerController.updateSinger);
router.delete('/:singerId', singerController.deleteSinger);

module.exports = router;