const DonateBook = require('../models/DonateBook');

const createDonateBook = async (req, res) => {
    try {
        const { name, quantity, status, description } = req.body;
        const userId = req.user._id;

        if (!name || !quantity || !status || !description) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const donateBook = new DonateBook({
            userId,
            name,
            quantity,
            status,
            description,
        });

        await donateBook.save();
        res.status(201).json({ message: 'Donate Book created successfully', donateBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDonateBooks = async (req, res) => {
    try {
        const donateBooks = await DonateBook.find();
        console.log("Donate Books: ", donateBooks);
        res.status(200).json(donateBooks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDonateBookById = async (req, res) => {
    try {
        // console.log(req.params);
        const { id } = req.params;
        // console.log(`Received id: ${id}`);
        const donateBook = await DonateBook.findById(id);

        if (!donateBook) {
            return res.status(404).json({ message: 'DonateBook not found' });
        }

        res.status(200).json(donateBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateDonateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity, status, description } = req.body;

        if (!name || !quantity || !status || !description) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const donateBook = await DonateBook.findById(id);

        if (!donateBook) {
            return res.status(404).json({ message: 'DonateBook not found' });
        }

        donateBook.name = name;
        donateBook.quantity = quantity;
        donateBook.status = status;
        donateBook.description = description;

        await donateBook.save();

        res.status(200).json({ message: 'DonateBook updated successfully', donateBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteDonateBook = async (req, res) => {
    try {
        const { id } = req.params;

        const donateBook = await DonateBook.findById(id);

        if (!donateBook) {
            return res.status(404).json({ message: 'DonateBook not found' });
        }

        await DonateBook.deleteOne({ _id: id });

        res.status(200).json({ message: 'DonateBook deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createDonateBook,
    getDonateBooks,
    getDonateBookById,
    updateDonateBook,
    deleteDonateBook
};
