const express = require('express');
const { ShowProgramSupplier } = require('../../models');
const router = express.Router();
const Joi = require('joi');

const showProgramSupplierSchema = Joi.object({
    name: Joi.string().required(),
    contact: Joi.string().required(),
    phone: Joi.string().required(),
    whatsapp: Joi.string().required(),
    tg: Joi.string().required(),
    email: Joi.string().required(),
    companyDetails: Joi.string().required()
});

router.get('/', async (req, res) => {
    try {
        const suppliers = await ShowProgramSupplier.findAll();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const supplier = await ShowProgramSupplier.findByPk(req.params.id);
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    const { error } = showProgramSupplierSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const supplier = await ShowProgramSupplier.create(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = showProgramSupplierSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const supplier = await ShowProgramSupplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'ShowProgramSupplier not found' });
        }

        await supplier.update(req.body);
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const supplier = await ShowProgramSupplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'ShowProgramSupplier not found' });
        }

        await supplier.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;