const express = require('express');
const router = express.Router();
const agentBController = require('../controllers/agentBController');
const { verifyToken } = require('../middlewares/verifyToken');

// Route to create an agent bureau
router.post('/', agentBController.createAgentB);


router.post('/login', agentBController.login);

router.get('/:id',verifyToken,agentBController.getAgentBById);

router.get('/',verifyToken, agentBController.GetAllAgentBs);

router.put('/:id',verifyToken,agentBController.updatedagentB);

router.delete('/:id',verifyToken, agentBController.deleteById);


module.exports = router;


