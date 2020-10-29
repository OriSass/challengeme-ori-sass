const { Router } = require('express');
const { Topic } = require('../../models');

const router = Router();

router.get('/allTopics', async (req, res) => {
    console.log(Topic);
    try {
        const allTopics = await Topic.findAll({})
        res.json(allTopics);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
