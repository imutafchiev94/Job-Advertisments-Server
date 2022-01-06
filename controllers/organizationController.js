const router = require('express').Router();
const organizationService = require('../services/organizationService');

router.get('/', async (req, res) => {
    try{
        let organizations = await organizationService.allOrganizations();

        res.json(organizations);
    } catch(err) {
        res.status(404).json(err);
    }
});

router.post('/add-job-advertisment', async (req, res) => {
    try{
        let message = await organizationService.addJobAdvertisment(req.body, req.body.organizationId)

        res.json(message);
    } catch(err) {
        res.status(401).json(err);
    }
});

router.patch('/edit-job-advertisment', async (req, res) => {
    try{
        let message = await organizationService.editJobAdvertisment(req.body, req.body.jobAdvertismentId, req.body.organizationId)

        res.json(message);
    } catch(err) {
        res.status(401).json(err);
    }
});

router.patch('/delete-job-advertisment', async (req, res) => {
    try{
        let message = await organizationService.deleteJobAdvertisment(req.body.jobAdvertismentId, req.body.organizationId)

        res.json(message);
    } catch(err) {
        res.status(401).json(err);
    }
})

router.get('/:id/all-canidates', async (req, res) => {
    try{
        let candidates = await organizationService.allCandidates(req.params.id, req.body.organizationId)

        res.json(candidates)
    } catch(err) {
        res.status(401).json(err);
    }
})

router.get('/:id/approve-canidate', async (req, res) => {
    try{
        let message = await organizationService.approveCandidate(req.params.id, req.body.organizationId, req.body.employeeId)

        res.json(message)
    } catch(err) {
        res.status(401).json(err);
    }
})

router.get('/:id/reject-canidate', async (req, res) => {
    try{
        let message = await organizationService.allCandidates(req.params.id, req.body.organizationId, req.body.employeeId)

        res.json(message)
    } catch(err) {
        res.status(401).json(err);
    }
})


module.exports = router;