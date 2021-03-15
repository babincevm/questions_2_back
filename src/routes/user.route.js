const router = require('express-promise-router')();
const {User} = require('../controllers');


router.route('/login/').post(User.login);
router.route('/register/').post(User.register);

module.exports = router;