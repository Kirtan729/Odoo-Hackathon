const Item = require('../models/Item');

exports.createItem = async (req, res) => {
    try {
        const item = await Item.create({ ...req.body, userId: req.userId });
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find({ userId: req.userId });
        res.json(items);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
