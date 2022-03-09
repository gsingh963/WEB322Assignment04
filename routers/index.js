let express = require('express');
let router = express.Router();
let controller = require('../controllers/index');

const authRestrict = (req, res, next) => {
    if(req.session.isLoggedIn)
        next();
    else
        res.status(401).redirect('/login');
};

router.get('/', controller.get.home);
router.get('/dashboard', authRestrict, controller.get.dashboard);
router.get('/gallery', controller.get.gallery);
router.get('/login', controller.get.login);
router.get('/registration', controller.get.registration);

router.post('/login', controller.post.login);
router.post('/registration', controller.post.registration);

module.exports = router;