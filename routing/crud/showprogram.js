const express = require('express');
const { ShowProgram, ShowProgramSupplier } = require('../../models');
const router = express.Router();
const Joi = require('joi');

const showProgramSchema = Joi.object({
    picture: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    supplierId: Joi.number().integer().required()
});

router.get('/', async (req, res) => {
    try {
        const programs = await ShowProgram.findAll({ include: 'supplier' });
        res.json(programs);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const program = await ShowProgram.findByPk(req.params.id, { include: 'supplier' });
        res.json(program);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    const { error } = showProgramSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const program = await ShowProgram.create(req.body);
        res.status(201).json(program);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = showProgramSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const program = await ShowProgram.findByPk(req.params.id);
        if (!program) {
            return res.status(404).json({ error: 'ShowProgram not found' });
        }

        await program.update(req.body);
        res.json(program);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const program = await ShowProgram.findByPk(req.params.id);
        if (!program) {
            return res.status(404).json({ error: 'ShowProgram not found' });
        }

        await program.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;