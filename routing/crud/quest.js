const express = require('express');
const router = express.Router();
const { Quest, Genre, Difficulty, Branch } = require('../../models');
const Joi = require('joi');

// Схема валидации для Quest
const questSchema = Joi.object({
    name: Joi.string().required(),
    genreId: Joi.number().integer().required(),
    difficultyId: Joi.number().integer().required(),
    branchId: Joi.number().integer().required(),
    players_count: Joi.number().integer().required(),
    game_time: Joi.string().required(),
    preview_image: Joi.string().required(),
    background_image: Joi.string().required(),
    additional_images: Joi.array().items(Joi.string()),
    description: Joi.string().required(),
    rules: Joi.string().required(),
    safety: Joi.string().required(),
    additional_services: Joi.array().items(Joi.string()),
    additional_players: Joi.number().integer().required(),
    price_per_additional_player: Joi.number().precision(2).required()
});

// Получение всех Quest
router.get('/', async (req, res) => {
    try {
        const quests = await Quest.findAll(
            {
                include: [
                    { model: Genre, as: 'genre', attributes: ['name'] },
                    { model: Difficulty, as: 'difficulty', attributes: ['name'] },
                    { model: Branch, as: 'branch', attributes: ['name'] }
                ]
            }
        );
        res.json(quests);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить список квестов' });
    }
});

// Получение Quest по ID
router.get('/:id', async (req, res) => {
    try {
        const quest = await Quest.findByPk(req.params.id,
            {
                include: [
                    { model: Genre, as: 'genre', attributes: ['name'] },
                    { model: Difficulty, as: 'difficulty', attributes: ['name'] },
                    { model: Branch, as: 'branch', attributes: ['name'] }
                ]
            }
        );
        if (quest) {
            res.json(quest);
        } else {
            res.status(404).json({ error: 'Квест не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить данные квеста' });
    }
});

// Создание нового Quest
router.post('/', async (req, res) => {
    const { error, value } = questSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const quest = await Quest.create(value);
        res.status(201).json(quest);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось создать квест' });
    }
});

// Обновление существующего Quest
router.put('/:id', async (req, res) => {
    const { error, value } = questSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const [updated] = await Quest.update(value, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedQuest = await Quest.findByPk(req.params.id);
            res.json(updatedQuest);
        } else {
            res.status(404).json({ error: 'Квест не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось обновить данные квеста' });
    }
});

// Удаление Quest
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Quest.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Квест не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось удалить квест' });
    }
});

module.exports = router;