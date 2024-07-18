const express = require('express');
const { Fact } = require('../../models');
const router = express.Router();
const Joi = require('joi');

const factSchema = Joi.object({
    icon: Joi.string().required(),
    text: Joi.string().required()
});

router.get('/', async (req, res) => {
    try {
        const facts = await Fact.findAll();
        res.json(facts);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    const { error } = factSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const fact = await Fact.create(req.body);
        res.status(201).json(fact);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = factSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const fact = await Fact.findByPk(req.params.id);
        if (!fact) {
            return res.status(404).json({ error: 'Fact not found' });
        }

        await fact.update(req.body);
        res.json(fact);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const fact = await Fact.findByPk(req.params.id);
        if (!fact) {
            return res.status(404).json({ error: 'Fact not found' });
        }

        await fact.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;