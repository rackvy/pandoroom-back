const express = require('express');
const router = express.Router();
const { Branch } = require('../../models');
const Joi = require('joi');

// Схема валидации для Branch
const branchSchema = Joi.object({
    name: Joi.string().required(),
    geo_coordinates: Joi.string().required(),
    phone: Joi.string().required(),
    whatsapp: Joi.string().required()
});

// Получение всех Branch
router.get('/', async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить список филиалов' });
    }
});

// Получение Branch по ID
router.get('/:id', async (req, res) => {
    try {
        const branch = await Branch.findByPk(req.params.id);
        if (branch) {
            res.json(branch);
        } else {
            res.status(404).json({ error: 'Филиал не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить данные филиала' });
    }
});

// Создание нового Branch
router.post('/', async (req, res) => {
    const { error, value } = branchSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const branch = await Branch.create(value);
        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось создать филиал' });
    }
});

// Обновление существующего Branch
router.put('/:id', async (req, res) => {
    const { error, value } = branchSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const [updated] = await Branch.update(value, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedBranch = await Branch.findByPk(req.params.id);
            res.json(updatedBranch);
        } else {
            res.status(404).json({ error: 'Филиал не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось обновить данные филиала' });
    }
});

// Удаление Branch
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Branch.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Филиал не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось удалить филиал' });
    }
});

module.exports = router;