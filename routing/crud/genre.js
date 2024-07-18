const express = require('express');
const router = express.Router();
const { Genre } = require('../../models');
const Joi = require('joi');

// Схема валидации для Genre
const genreSchema = Joi.object({
    name: Joi.string().required()
});

// Получение всех Genre
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить список жанров' });
    }
});

// Получение Genre по ID
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByPk(req.params.id);
        if (genre) {
            res.json(genre);
        } else {
            res.status(404).json({ error: 'Жанр не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить данные жанра' });
    }
});

// Создание нового Genre
router.post('/', async (req, res) => {
    const { error, value } = genreSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const genre = await Genre.create(value);
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ error: 'Не удалось создать жанр' });
    }
});

// Обновление существующего Genre
router.put('/:id', async (req, res) => {
    const { error, value } = genreSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const [updated] = await Genre.update(value, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedGenre = await Genre.findByPk(req.params.id);
            res.json(updatedGenre);
        } else {
            res.status(404).json({ error: 'Жанр не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось обновить данные жанра' });
    }
});

// Удаление Genre
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Genre.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Жанр не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось удалить жанр' });
    }
});

module.exports = router;