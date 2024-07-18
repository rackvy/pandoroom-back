const express = require('express');
const router = express.Router();
const { Booking, Quest, Admin } = require('../../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Валидация данных
const bookingSchema = Joi.object({
    questId: Joi.number().integer().required(),
    cost: Joi.number().required(),
    peopleCount: Joi.number().integer().required(),
    dateTime: Joi.date().required(),
    animator: Joi.boolean().required(),
    extraPeople: Joi.number().integer().required()
});

// Middleware для авторизации
const authenticate = async (req, res, next) => {
    const { sessionId } = req.headers;
    if (!sessionId) {
        return res.status(401).json({ error: 'Необходимо авторизоваться' });
    }

    const admin = await Admin.findOne({ where: { sessionId } });
    if (!admin) {
        return res.status(401).json({ error: 'Сессия недействительна' });
    }

    req.admin = admin;
    next();
};

// CRUD маршруты
router.post('/', authenticate, async (req, res) => {
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const booking = await Booking.create(value);
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при создании бронирования' });
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: { model: Quest, as: 'quest' }
        });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении бронирований' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: { model: Quest, as: 'quest' }
        });
        if (!booking) {
            return res.status(404).json({ error: 'Бронирование не найдено' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении бронирования' });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Бронирование не найдено' });
        }

        await booking.update(value);
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при обновлении бронирования' });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Бронирование не найдено' });
        }

        await booking.destroy();
        res.json({ message: 'Бронирование удалено' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при удалении бронирования' });
    }
});

module.exports = router;