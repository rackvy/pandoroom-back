const express = require('express');
const { Cake, CakeSupplier } = require('../../models');
const router = express.Router();
const Joi = require('joi');

const cakeSchema = Joi.object({
    picture: Joi.string().required(),
    name: Joi.string().required(),
    priceWeight: Joi.string().required(),
    supplierId: Joi.number().integer().required()
});

router.get('/', async (req, res) => {
    try {
        const cakes = await Cake.findAll({ include: 'supplier' });
        res.json(cakes);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cake = await Cake.findByPk(req.params.id, { include: 'supplier' });
        res.json(cake);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    const { error } = cakeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const cake = await Cake.create(req.body);
        res.status(201).json(cake);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = cakeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const cake = await Cake.findByPk(req.params.id);
        if (!cake) {
            return res.status(404).json({ error: 'Cake not found' });
        }

        await cake.update(req.body);
        res.json(cake);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const cake = await Cake.findByPk(req.params.id);
        if (!cake) {
            return res.status(404).json({ error: 'Cake not found' });
        }

        await cake.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;