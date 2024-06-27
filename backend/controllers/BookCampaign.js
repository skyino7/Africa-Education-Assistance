const BookCampaign = require('../models/BookCampaign');

const createBookCampaign = async (req, res) => {

    console.log("Received file:", req.file);

    const data = req.body;
    console.log("Data: ", data);

    const data1 = req.params;
    console.log("Data1: ", data1);

    const { name, quantity, description, received } = req.body;
    const picture = req.file ? req.file.path : null;
    console.log("Picture: ", picture);

    const parsedQuantity = parseInt(quantity, 10);

    const parsedReceived = received === 'true';

    if (!name || !parsedQuantity || !description) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    try {
        const userId = req.user._id;
        const bookCampaign = new BookCampaign({
            userId,
            name,
            quantity: parsedQuantity,
            description,
            picture,
            received: parsedReceived
        });

        await bookCampaign.save();
        res.status(201).json({ message: "Book Campaign created successfully", bookCampaign });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = createBookCampaign;


const getBookCampaigns = async (req, res) => {

    try {
        const bookCampaigns = await BookCampaign.find();
        res.status(200).json(bookCampaigns);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getBookCampaignById = async (req, res) => {

    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide the id' });
        }
        const bookCampaign = await BookCampaign.findById(id);
        if (!bookCampaign) {
            return res.status(404).json({ message: 'Book Campaign not found' });
        }
        res.status(200).json(bookCampaign);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    }

}

const updateBookCampaign = async (req, res) => {

    try {

        const { id } = req.params;
        console.log("ID: ", id);

        const { userId, name, quantity, description } = req.body;
        console.log("Data: ", req.body);

        if (!userId || !name || !quantity || !description) {
            return res.status(400).json({ message: 'Please provide all the fields' });
        }

        const bookCampaign = await BookCampaign.findById(id);
        if (!bookCampaign) {
            return res.status(404).json({ message: 'Book Campaign not found' });
        }

        bookCampaign.userId = userId;
        bookCampaign.name = name;
        bookCampaign.quantity = quantity;
        bookCampaign.description = description;

        await bookCampaign.save();

        res.status(200).json({message: "Book Campaign updated successfully", bookCampaign});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteBookCampaign = async (req, res) => {
    try {

        const { id } = req.params;

        const bookCampaign = await BookCampaign.findById(id);
        if (!bookCampaign) {
            return res.status(404).json({ message: 'Book Campaign not found' });
        }

        const deleted = await BookCampaign.deleteOne({ _id: id });
        console.log("Deleted: ", deleted);

        res.status(200).json({message: "Book Campaign deleted successfully", bookCampaign});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    createBookCampaign,
    getBookCampaigns,
    getBookCampaignById,
    updateBookCampaign,
    deleteBookCampaign
};
