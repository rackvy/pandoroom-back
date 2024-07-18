const express = require('express');
const { Review, ReviewSource } = require('../../models');
const router = express.Router();
const Joi = require('joi');

const reviewSchema = Joi.object({
    name: Joi.string().required(),
    rating: Joi.number().integer().required(),
    sourceId: Joi.number().integer().required(),
    text: Joi.string().required()
});

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll({ include: 'source' });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await review.update(req.body);
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await review.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;