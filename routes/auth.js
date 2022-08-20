//Authentication Routes
const router = require('express').Router();


router.post('/signup', (req,res)=>{
    res.end('signup started')
})


module.exports = router;