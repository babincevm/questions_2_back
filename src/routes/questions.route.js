const router = require('express-promise-router')();
const {Questions, User} = require('../controllers');


router.use(User.authenticateJWT);
router.route('/').get(Questions.getAll);
router.route('/check/').post(Questions.checkAnswers);
router.route(`/download/:filename`).get(({params: {filename}}, res) => {
    res.download(`./files/${filename}`);
})

module.exports = router;