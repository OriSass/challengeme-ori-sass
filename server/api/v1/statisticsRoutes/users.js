const { Router } = require('express');
const router = Router()
const { Submission, Challenge } = require('../../../models');


router.get('/top-users', async (req, res) => {
    res.send('hello world users')
  })

module.exports = router;