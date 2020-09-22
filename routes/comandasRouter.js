const express = require('express');
const comandasController = require('../controllers/comandasController');
const router = express.Router();

// Routes
router.get('/', comandasController.getAllComandas);
router.post('/', comandasController.addComanda);
router.get('/:id', comandasController.getOneComanda);
router.put('/:id', comandasController.updateComanda);
router.delete('/:id', comandasController.deleteComanda);

module.exports = router;