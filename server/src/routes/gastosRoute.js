const express = require('express');
const gastosController = require('../controllers/gastosController');

const router = express.Router();

router.get('/', gastosController.getGastos);
router.post('/', gastosController.createGastos);
router.delete('/:id', gastosController.deleteGastos);
router.put('/:id', gastosController.updateGastos);

module.exports = router;
