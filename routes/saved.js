const express = require('express')
const router = express.Router()
const savedController = require('../controllers/saved')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, savedController.getIndex)
router.delete('/:id', savedController.deletePost)
//router.get('/today', savedController.getToday)
//router.get('/date', savedController.getByDate);
//router.delete('/deletePost/:id', savedController.deletePost)

module.exports = router