const express = require('express');
const router = express.Router();
const { createContract, acceptContract, getContracts } = require('../controllers/contractController');

router.post('/create', createContract);
router.post('/accept', acceptContract);
router.get('/', getContracts);


module.exports = router;
