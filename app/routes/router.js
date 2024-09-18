const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller.js');
const libroController = require('../controllers/libro.controller.js');
const autorController = require('../controllers/autor.controller');

router.post('/usuarios', usuarioController.create);           
router.get('/usuarios', usuarioController.retrieveAllUsuarios); 
router.get('/usuarios/:id', usuarioController.getUsuarioById);  
router.put('/usuarios/:id', usuarioController.updateById);      
router.delete('/usuarios/:id', usuarioController.deleteById);   

router.post('/libros', libroController.create);
router.get('/libros', libroController.retrieveAllLibros);
router.get('/libros/:id', libroController.getLibroById);
router.put('/libros/:id', libroController.updateById);
router.delete('/libros/:id', libroController.deleteById);

router.post('/autor', autorController.create);
router.get('/autor', autorController.retrieveAllAutores);
router.get('/autor/:id', autorController.getAutorById);
router.put('/autor/:id', autorController.updateById);
router.delete('/autor/:id', autorController.deleteById);

module.exports = router;
