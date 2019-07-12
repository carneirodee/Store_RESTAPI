'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/patients-controller')


router.get('/:id', controller.getById);

router.get('/', controller.get);

router.post('/', controller.post);

router.post('/authenticate', controller.authenticate)

router.put('/:id',controller.put);

router.delete('/:id', controller.delete);

module.exports = router;