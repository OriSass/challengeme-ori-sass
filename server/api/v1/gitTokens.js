require('dotenv').config();
const { Router } = require('express');
const { GitToken, Submission } = require('../../models');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const allTokens = await GitToken.findAll({})
        const month = 31 * 24 * 60 * 60 * 1000;
        const submissionCount = await Submission.findAll({
            attributes:[[sequelize.fn('COUNT', sequelize.col('id')), 'countSubmission']],
            where: {
                created_at: {
                  [Op.gte]: new Date(Date.now() - month),
                },
              },
        })
        const tokensArray = allTokens.map(token => token.dataValues.token)
        console.log(process.env.GITHUB_ACCESS_TOKEN);
        let location = tokensArray.indexOf(process.env.GITHUB_ACCESS_TOKEN)
        if (tokensArray.length === location + 1) {
            location = -1
        }
        if(submissionCount[0].dataValues.countSubmission > 1000 * (location + 1)) {
            process.env.GITHUB_ACCESS_TOKEN = tokensArray[location + 1];
        }
        console.log(process.env.GITHUB_ACCESS_TOKEN);
        res.json([allTokens,submissionCount])
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

router.post('/', async (req, res) => {
    try {
        const token = req.body.token;
        const newToken = await GitToken.create({ token })
        res.json(newToken)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

router.delete('/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const removedToken = await GitToken.destroy({
            where: {
                token: token
            }
        })
        res.json(removedToken)
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Cannot process request' });
    }
});

module.exports = router;