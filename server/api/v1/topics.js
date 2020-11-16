const { Router } = require('express');
const { Topic, TopicUser } = require('../../models');

const router = Router();

router.get('/all-topics', async (req, res) => {
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
    const {newTopic: newTopicName, newTopicCategory} = req.body;
    const userId = 1; // change to real userId => David
    try {
        const currentTopic = await Topic.findOne({
            where: {name: newTopicName}
        });
        if(currentTopic === null){
            // topic doesn't exist
            // adding it to the topics table
            const count = await Topic.create({
                name: newTopicName,
                demandCounter: 1,
                authorized:true // change later
            });
            const newTopicObj = await Topic.findOne({where: {name: newTopicName}});
            // adding the user's vote to the topic
            const newVote = await TopicUser.create({
               topic_id: newTopicObj.id,
               user_id: userId
            })
            res.json(count);
        }
        else{
            res.status(409).send("Already exists")
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
router.put("/add-demand", async(req, res) => {
    try {   
        const userId = 1; // change to real userId => David
        const {topicId} = req.body; 
        const userVoted = await TopicUser.findOne({
            where: {
                topic_id: topicId,
                user_id: userId
            }
        }) !== null;
        if(userVoted === false){
            const currentTopic = await Topic.findOne({where: {id: topicId}});
            await Topic.update({ demandCounter: currentTopic.demandCounter + 1 }, {
                where: {
                    name: currentTopic.name
                }
            });
            // adding the user's vote to the topic
            const count = await TopicUser.create({
                topic_id: currentTopic.id,
                user_id: userId
            })
            res.json(count);
        }
        else{
            res.status(409).send("Already voted");
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;
