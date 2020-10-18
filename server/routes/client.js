/* Assignment2, Franz Cadiente 301098663, 10/18/2020
 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let clientController = require('../controllers/client')

//helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/* GET Route for Client List page READ OPERATION */
router.get('/', clientController.displayClientList);

/* GET Route for displaying Add page CREATE OPERATION */
router.get('/add', requireAuth, clientController.displayAddPage);

/* POST Route for processing Add page CREATE OPERATION */
router.post('/add', requireAuth, clientController.processAddPage);

/* GET Route for displaying Edit page UPDATE OPERATION */
router.get('/edit/:id', requireAuth, clientController.displayEditPage);

/* POST Route for processing Edit page UPDATE OPERATION */
router.post('/edit/:id', requireAuth, clientController.processEditPage);

/* GET Route for deletion DELETE OPERATION */
router.get('/delete/:id', requireAuth, clientController.performDelete);

module.exports = router;