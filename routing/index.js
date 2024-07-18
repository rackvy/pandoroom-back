const express = require('express');
const router = express.Router();

const genreRoutes = require('./crud/genre');
const difficultyRoutes = require('./crud/difficulty');
const branchRoutes = require('./crud/branch');
const questRoutes = require('./crud/quest');
const newsRouter = require('./crud/news');
const factRouter = require('./crud/fact');
const reviewRouter = require('./crud/review');
const reviewSourceRouter = require('./crud/reviewsource');
const sliderRouter = require('./crud/slider');
const cakeRouter = require('./crud/cake');
const cakeSupplierRouter = require('./crud/cakesupplier');
const showProgramRouter = require('./crud/showprogram');
const showProgramSupplierRouter = require('./crud/showprogramsupplier');
const adminRoutes = require('./crud/admin');
const bookingRoutes = require('./crud/booking');


router.use('/genres', genreRoutes);
router.use('/difficulties', difficultyRoutes);
router.use('/branches', branchRoutes);
router.use('/quests', questRoutes);
router.use('/news', newsRouter);
router.use('/fact', factRouter);
router.use('/review', reviewRouter);
router.use('/review-source', reviewSourceRouter);
router.use('/slider', sliderRouter);
router.use('/cake', cakeRouter);
router.use('/cake-supplier', cakeSupplierRouter);
router.use('/show-program', showProgramRouter);
router.use('/show-program-supplier', showProgramSupplierRouter);
router.use('/admin', adminRoutes);
router.use('/booking', bookingRoutes);


module.exports = router;