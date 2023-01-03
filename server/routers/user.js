const express =  require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/account', userController.getAllAccount);

module.exports = router;
