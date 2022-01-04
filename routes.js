const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({Message: 'Hello World from Express'});
})

module.exports = router;