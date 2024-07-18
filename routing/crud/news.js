const express = require('express');
const { News, Difficulty} = require('../../models');
const router = express.Router();
const Joi = require('joi');

const newsSchema = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().required(),
    picture: Joi.string().required(),
    text: Joi.string().required()
});

router.get('/', async (req, res) => {
    try {
        const news = await News.findAll();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (news) {
            res.json(news);
        } else {
            res.status(404).json({ error: 'Новость не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Не удалось получить данные' });
    }
});

router.post('/', async (req, res) => {
    const { error } = newsSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const news = await News.create(req.body);
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = newsSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        await news.update(req.body);
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        await news.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;