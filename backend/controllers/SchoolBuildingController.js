const SchoolBuilding = require('../models/SchoolBuilding');
const paystack = require('paystack');
const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
require('dotenv').config();

const createSchoolBuilding = async (req, res) => {
    try {
        const { name, description, address, city, region, country, AmountNeeded } = req.body;
        const userId = req.user._id;

        if (!name || !description || !address || !city || !region || !country || !AmountNeeded) {
            return res.status(400).json({ message: 'Please fill all the required fields' });
        }

        // const picture = req.file ? req.file.path : null;

        const schoolBuilding = new SchoolBuilding({
            name,
            description,
            address,
            city,
            region,
            country,
            AmountNeeded,
            AmountRaised: 0,
            userId
        });

        if (req.file) {
            schoolBuilding.image = req.file.path ? req.file.path : null;
          }

        await schoolBuilding.save();
        res.status(201).json({ message: 'School building created successfully', schoolBuilding });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getSchoolBuildings = async (req, res) => {
    try {
        const schoolBuildings = await SchoolBuilding.find();
        res.status(200).json(schoolBuildings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSchoolBuildingById = async (req, res) => {
    try {
        const { id } = req.params;
        const schoolBuilding = await SchoolBuilding.findById(id);

        if (!schoolBuilding) {
            return res.status(404).json({ message: 'School building not found' });
        }

        res.status(200).json(schoolBuilding);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateSchoolBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, address, city, region, country, AmountNeeded, verified } = req.body;
        const userId = req.user._id;


        const building = req.body;
        console.log("Building: ", building);

        if (!name || !description || !address || !city || !region || !country || !AmountNeeded) {
            return res.status(400).json({ message: 'Please fill all the required fields' });
        }

        const schoolBuilding = await SchoolBuilding.findById(id);

        if (!schoolBuilding) {
            return res.status(404).json({ message: 'School building not found' });
        }

        const BuildingUserId = schoolBuilding.userId.toString();
        console.log("Building User ID: ", BuildingUserId);

        console.log("User ID 2: ", userId)

        if (schoolBuilding.userId.toString() !== userId.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized: User not allowed to perform this action of School Building' });
        }

        schoolBuilding.name = name;
        schoolBuilding.description = description;
        schoolBuilding.address = address;
        schoolBuilding.city = city;
        schoolBuilding.region = region;
        schoolBuilding.country = country;
        schoolBuilding.AmountNeeded = AmountNeeded;
        schoolBuilding.verified = verified;

        await schoolBuilding.save();

        res.status(200).json({ message: 'School building updated successfully', schoolBuilding });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteSchoolBuilding = async (req, res) => {
    try {
        const { id } = req.params;

        const schoolBuilding = await SchoolBuilding.findById(id);

        if (!schoolBuilding) {
            return res.status(404).json({ message: 'School building not found' });
        }

        await schoolBuilding.deleteOne();

        res.status(200).json({ message: 'School building deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const donateToSchoolBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ message: 'Please provide an amount to donate' });
        }

        const schoolBuilding = await SchoolBuilding.findById(id);

        if (!schoolBuilding) {
            return res.status(404).json({ message: 'School building not found' });
        }

        schoolBuilding.AmountRaised += amount;

        await schoolBuilding.save();

        res.status(200).json({ message: 'Donation added successfully', schoolBuilding });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// const initializeDonation = async (req, res) => {
//     try {
//         const { amount } = req.body;
//         const { id } = req.params; // ID of the school building
//         const userId = req.user._id; // Get the userId from the logged-in user

//         if (!amount) {
//             return res.status(400).json({ message: 'Please provide the amount to donate' });
//         }

//         const schoolBuilding = await SchoolBuilding.findById(id);

//         if (!schoolBuilding) {
//             return res.status(404).json({ message: 'School building not found' });
//         }

//         const paymentData = {
//             email: req.user.email, // User's email
//             amount: amount * 100, // Paystack requires the amount in kobo (smallest unit of currency)
//             metadata: {
//                 userId: userId.toString(),
//                 buildingId: id.toString()
//             }
//         };

//         const paymentResponse = await paystack.transaction.initialize(paymentData);

//         res.status(200).json({ message: 'Payment initialized successfully', authorization_url: paymentResponse.data.authorization_url });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const initializeTransaction = async (req, res) => {
    try {
        const { amount, email } = req.body; // Amount in kobo (smallest unit of currency in Nigeria)

        // Create payment data object
        const paymentData = {
            email,
            amount,
            metadata: {
                custom_fields: [
                    {
                        display_name: "Description",
                        variable_name: "description",
                        value: "Donation for school building"
                    }
                ]
            }
        };

        // Make a POST request to Paystack API to initialize transaction
        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        // Parse the response
        const responseData = await response.json();

        // Check if the request was successful
        if (!response.ok) {
            return res.status(response.status).json({ error: responseData.message });
        }

        // Extract the transaction reference
        const { data } = responseData;
        const { reference, authorization_url } = data;

        // Return the reference to the client or use it in further processing
        res.status(200).json({ reference, authorization_url });

    } catch (error) {
        console.error('Error initializing transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyDonation = async (req, res) => {
    console.log("Query: ",req.query);
    try {
        const { reference } = req.query;

        if (!reference) {
            return res.status(400).json({ message: 'Payment reference is required' });
        }

        // Verify payment with Paystack API
        const verificationResponse = await paystack.transaction.verify(reference);

        // Check if payment verification was successful
        if (verificationResponse.data.status !== 'success') {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        // Extract metadata and amount from verification response
        const { metadata, amount } = verificationResponse.data;
        const { buildingId } = metadata;

        // console.log("Metadata: ", metadata);

        // Find the corresponding SchoolBuilding by buildingId
        const schoolBuilding = await SchoolBuilding.findById(buildingId);

        // Handle case where SchoolBuilding is not found
        if (!schoolBuilding) {
            return res.status(404).json({ message: 'School building not found' });
        }

        // Update AmountRaised by adding the verified amount (convert from kobo if necessary)
        schoolBuilding.AmountRaised += amount / 100; // Convert amount back to the base unit
        await schoolBuilding.save(); // Save the updated SchoolBuilding

        // Respond with success message and updated SchoolBuilding
        res.status(200).json({ message: 'Donation verified and updated successfully', schoolBuilding });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createSchoolBuilding,
    getSchoolBuildings,
    getSchoolBuildingById,
    updateSchoolBuilding,
    deleteSchoolBuilding,
    donateToSchoolBuilding,
    initializeTransaction,
    verifyDonation
};
