const express = require('express');
const router = express.Router();
const { Difficulty } = require('../../models');
const Joi = require('joi');

// Схема валидации для Difficulty
const difficultySchema = Joi.object({
    name: Joi.string().required()
});

// Получение всех Difficulty
router.get('/', async (req, res) => {
    try {
        const difficulties = await Difficulty.findAll();
        res.json(difficulties);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить список сложностей' });
    }
});

// Получение Difficulty по ID
router.get('/:id', async (req, res) => {
    try {
        const difficulty = await Difficulty.findByPk(req.params.id);
        if (difficulty) {
            res.json(difficulty);
        } else {
            res.status(404).json({ error: 'Сложность не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить данные сложности' });
    }
});

// Создание нового Difficulty
router.post('/', async (req, res) => {
    const { error, value } = difficultySchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const difficulty = await Difficulty.create(value);
        res.status(201).json(difficulty);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось создать сложность' });
    }
});

// Обновление существующего Difficulty
router.put('/:id', async (req, res) => {
    const { error, value } = difficultySchema.validate(req.body  );

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const [updated] = await Difficulty.update(value, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDifficulty = await Difficulty.findByPk(req.params.id);
            res.json(updatedDifficulty);
        } else {
            res.status(404).json({ error: 'Сложность не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось обновить данные сложности' });
    }
});

// Удаление Difficulty
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Difficulty.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Сложность не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось удалить сложность' });
    }
});

module.exports = router;