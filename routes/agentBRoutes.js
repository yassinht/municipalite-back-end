const express = require('express');
const router = express.Router();
const agentBController = require('../controllers/agentBController');
const { verifyToken } = require('../middlewares/verifyToken');

// Route to create an agent bureau
router.post('/', agentBController.createAgentB);


router.post('/login', agentBController.login);

router.get('/:id',agentBController.getAgentBById);

router.get('/', agentBController.GetAllAgentBs);

router.put('/:id',agentBController.updatedagentB);

router.delete('/:id', agentBController.deleteById);


module.exports = router;


