
const express=require('express')
const router=express.Router()
const OpinionController=require('../controllers/opinionController')

router.post('/', OpinionController.addOpinion);

router.get('/reclamations/:reclamationId', OpinionController.getOpinionsByReclamation);

// Delete an opinion
router.delete('/:opinionId', OpinionController.deleteOpinion);

// Get all opinions
router.get('/', OpinionController.getAllOpinions);

// Get opinions by Citoyen ID
router.get('/citoyen/:citoyenId', OpinionController.getOpinionsByCitoyenId);

module.exports = router