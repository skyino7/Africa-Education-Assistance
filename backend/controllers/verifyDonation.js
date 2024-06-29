const SchoolBuilding = require('../models/SchoolBuilding');

const verifyDonation = async (req, res) => {
    const { reference, buildingId } = req.body;

    try {
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log("Donation: ", data);

        if (data.status && data.data.status === 'success') {
            const schoolBuilding = await SchoolBuilding.findById(buildingId);
            console.log("School Building ID: ", schoolBuilding);

            if (!schoolBuilding) {
                return res.status(404).json({ message: 'School building not found' });
            }

            schoolBuilding.AmountRaised += data.data.amount / 100; // Convert amount back to the base unit
            await schoolBuilding.save();

            return res.status(200).json({ message: 'Donation verified and updated successfully', schoolBuilding });
        } else {
            return res.status(400).json({ message: 'Payment not successful' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = verifyDonation;
