const { Router } = require('express');
const accountBookController = require('../controller/accountBookController')

const router = Router();

router.get('/new', accountBookController.createAccountBook);




module.exports = router;