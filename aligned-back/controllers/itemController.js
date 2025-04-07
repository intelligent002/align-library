const LibraryItem = require('../models/LibraryItem');
const {validateItemInput} = require('../validators/itemValidator');

exports.getItems = async (req, res) => {
    const items = await LibraryItem.find().sort({createdAt: -1});
    res.json(items);
};

exports.getItem = async (req, res) => {
    const {itemId} = req.params;

    try {
        const item = await LibraryItem.findById(itemId);
        if (!item) {
            return res.status(404).json({error: 'Item not found'});
        }

        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.addItem = async (req, res) => {
    const {name, url} = req.body;

    const {isValid, errors, type} = validateItemInput(name, url);
    if (!isValid) return res.status(400).json({errors});

    try {
        const newItem = new LibraryItem({
            type,
            name,
            url
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateItem = async (req, res) => {
    const {itemId} = req.params;
    const {name, url} = req.body;

    const {isValid, errors, type} = validateItemInput(name, url);
    if (!isValid) return res.status(400).json({errors});

    try {
        const updated = await LibraryItem.findByIdAndUpdate(
            itemId,
            {name, url, type},
            {new: true, runValidators: true}
        );

        if (!updated) {
            return res.status(404).json({error: 'Item not found'});
        }

        res.json(updated);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteItem = async (req, res) => {
    const {itemId} = req.params;

    try {
        const deleted = await LibraryItem.findByIdAndDelete(itemId, undefined);
        if (!deleted) return res.status(404).json({error: 'Item not found'});

        res.json({message: 'Item deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
