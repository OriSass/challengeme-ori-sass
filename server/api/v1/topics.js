const { Router } = require('express');
const { Topic, TopicUser } = require('../../models');

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
router.post('/new-topic', async (req, res) => {
    const {newTopic, newTopicCategory} = req.body;
    console.log("GOT TO ENDPOINT");
    console.log("newTopic:" + newTopic + " category: " + newTopicCategory);
    try {
        // add logic with topicUsers:
        // if exist check if user voted
        // if exists and user voted he cant vote ;)
        const exists = await Topic.findOne({
            where: {name: newTopic}
        }) !== null;
        if(exists === false){
            const count = await Topic.create({
                name: newTopic,
                demandCounter: 1
            });
            res.json(count)
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
