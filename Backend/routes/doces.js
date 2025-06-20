const express = require('express');
const router = express.Router();
const Doce = require('../database/models/Doce'); // Caminho corrigido

// Obter todos os doces
router.get('/', async (req, res) => {
    try {
        const doces = await Doce.find();
        res.json(doces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obter doces por categoria (CORREÇÃO: parâmetro deve ser 'categoria', não 'category')
router.get('/categoria/:categoria', async (req, res) => {
    try {
        const doces = await Doce.find({ category: req.params.categoria }); // Corrigido para req.params.categoria
        res.json(doces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Adicionar novo doce
router.post('/', async (req, res) => {
    const doce = new Doce({
        name: req.body.name,
        img: req.body.img,
        price: req.body.price,
        sizes: req.body.sizes,
        description: req.body.description,
        category: req.body.category
    });

    try {
        const newDoce = await doce.save();
        res.status(201).json(newDoce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;