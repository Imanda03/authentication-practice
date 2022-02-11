const { Router } = require('express');
const authController = require('../controller/authController')

const router = Router();

router.get('/register',authController.register_get);
router.post('/register',authController.register_post);
router.get('/logIn',authController.logIn_get);
router.post('/logIn',authController.logIn_post);



module.exports = router;