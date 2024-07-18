const express = require('express');
const { Slider } = require('../../models');
const router = express.Router();
const Joi = require('joi');

const sliderSchema = Joi.object({
    picture: Joi.string().required(),
    link: Joi.string().required()
});

router.get('/', async (req, res) => {
    try {
        const sliders = await Slider.findAll();
        res.json(sliders);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    const { error } = sliderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const slider = await Slider.create(req.body);
        res.status(201).json(slider);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = sliderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const slider = await Slider.findByPk(req.params.id);
        if (!slider) {
            return res.status(404).json({ error: 'Slider not found' });
        }

        await slider.update(req.body);
        res.json(slider);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const slider = await Slider.findByPk(req.params.id);
        if (!slider) {
            return res.status(404).json({ error: 'Slider not found' });
        }

        await slider.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;