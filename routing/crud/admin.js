const express = require('express');
const { Admin } = require('../../models');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


const adminSchema = Joi.object({
    name: Joi.string().required(),
    dob: Joi.date().iso().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    position: Joi.string().required(),
    password: Joi.string().min(6).required(),
    sessionId: Joi.string().uuid().required()
});

router.get('/', async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    const { error } = adminSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const admin = await Admin.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:id', async (req, res) => {
    const { error } = adminSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        await admin.update(req.body);
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        await admin.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// POST /api/admin/auth
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Найти администратора по электронной почте
        const admin = await Admin.findOne({ where: { email } });

        // Если администратор не найден
        if (!admin) {
            return res.status(401).json({ error: 'Авторизация не удалась. Пользователь не найден.' });
        }

        // Проверка пароля
        const passwordMatch = await bcrypt.compare(password, admin.password);

        // Если пароль не соответствует
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Авторизация не удалась. Неправильный пароль.' });
        }

        // Генерация и сохранение сессионного UUID
        const sessionId = uuidv4();
        admin.sessionId = sessionId;
        await admin.save();

        // Отправка успешного ответа с сессионным UUID
        res.json({ sessionId });
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({ error: 'Ошибка сервера при авторизации.' });
    }
});

module.exports = router;