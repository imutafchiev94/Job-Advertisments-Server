const router = require('express').Router();
const authService = require('../services/authService');

router.post('/employee-register', async (req, res) => {
    try{
        let message = await authService.registerEmployee(req.body);
        res.json(message);
    } catch(err) {
        res.status(401).json(err);
    }
}) 

router.post('/organization-register', async (req, res) => {
    try{
        let message = await authService.registerOrganization(req.body);
        res.json(message);
    } catch(err) {
        res.status(401).json(err);
    }
})

router.post('/employee-login', async (req, res) => {
    try {
        let token = await authService.loginEmployee(req.body.email, req.body.password);
        res.json(token);
    } catch (err) {
        res.status(401).json(err)
    }
})

router.post('/organization-login', async (req, res) => {
    try {
        let token = await authService.loginOrganization(req.body.email, req.body.password);
        res.json(token);
    } catch (err) {
        res.status(401).json(err)
    }
})

router.patch('/employee-edit-name', async (req, res) => {
    try {
        let message = await authService.updateEmployeeName(req.body.name, req.body.employeeId);
        res.json(message);
    } catch(err) {
        res.status(401).json(err)
    }
})

router.patch('/employee-change-password', async (req, res) => {
    try {
        let message = await authService.changeEmployeePassword(
            req.body.oldPassword, 
            req.body.newPassword,
            req.body.confirmNewPassword,
            req.body.employeeId);
        res.json(message);
    } catch(err) {
        res.status(401).json(err)
    }
})

router.patch('/employee-delete', async (req, res) => {
    try {
        let message = await authService.deleteEmployee(req.body.employeeId);
        res.json(message);
    } catch(err) {
        res.status(401).json(err)
    }
})

router.patch('/organization-delete', async (req, res) => {
    try {
        let message = await authService.deleteOrganization(req.body.organizationId);
        res.json(message);
    } catch(err) {
        res.status(401).json(err)
    }
})

module.exports = router;