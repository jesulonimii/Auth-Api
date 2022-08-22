//Authentication Routes
const router = require('express').Router();
const PostController = require("../controllers/post.controller");
const {verifyToken} = require('../middlewares/jwt.middleware')


router.post('/compose', verifyToken, PostController.create)
router.post('/fetch', verifyToken, PostController.fetch)
router.post('/fetch/:id', verifyToken, PostController.fetch)
router.post('/edit/:id', verifyToken, PostController.edit)
router.post('/delete/:id', verifyToken, PostController.delete)






module.exports = router;