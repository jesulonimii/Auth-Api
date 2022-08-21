//Authentication Routes
const router = require('express').Router();
const PostController = require("../controllers/post.controller");
const authenticate = require('../middlewares/jwt.middleware')


router.post('/compose', authenticate, PostController.create)
router.post('/fetch', authenticate, PostController.fetch)
router.post('/fetch/:id', authenticate, PostController.fetch)
router.post('/edit/:id', authenticate, PostController.edit)
router.post('/delete/:id', authenticate, PostController.delete)






module.exports = router;