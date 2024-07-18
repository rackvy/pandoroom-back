const express = require('express');
const { ReviewSource, Difficulty} = require('../../models');
const router = express.Router();
const Joi = require('joi');

const reviewSourceSchema = Joi.object({
    name: Joi.string().required(),
    icon: Joi.string().required()
});

router.get('/', async (req, res) => {
    try {
        const sources = await ReviewSource.findAll();
        res.json(sources);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const source = await ReviewSource.findByPk(req.params.id);
        if (source) {
            res.json(source);
        } else {
            res.status(404).json({ error: 'Поставщик не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить данные' });
    }
});

router.post('/', async (req, res) => {
    const { error } = reviewSourceSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const source = await ReviewSource.create(req.body);
        res.status(201).json(source);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = reviewSourceSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const source = await ReviewSource.findByPk(req.params.id);
        if (!source) {
            return res.status(404).json({ error: 'ReviewSource not found' });
        }

        await source.update(req.body);
        res.json(source);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const source = await ReviewSource.findByPk(req.params.id);
        if (!source) {
            return res.status(404).json({ error: 'ReviewSource not found' });
        }

        await source.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;