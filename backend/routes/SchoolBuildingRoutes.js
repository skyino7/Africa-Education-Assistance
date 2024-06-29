const express = require('express');
const {
    createSchoolBuilding,
    getSchoolBuildings,
    getSchoolBuildingById,
    updateSchoolBuilding,
    deleteSchoolBuilding,
    donateToSchoolBuilding,
    initializeTransaction,
    verifyDonation
} = require('../controllers/SchoolBuildingController');
const schoolOwner = require('../middleware/schoolOwner');
const { IsUser } = require('../middleware/verifyToken');

const SchoolBuildingRoutes = express.Router();

SchoolBuildingRoutes.post('/create', IsUser, createSchoolBuilding);
SchoolBuildingRoutes.get('/', getSchoolBuildings);
SchoolBuildingRoutes.get('/:id', getSchoolBuildingById);
SchoolBuildingRoutes.put('/update/:id', IsUser, schoolOwner, updateSchoolBuilding);
SchoolBuildingRoutes.delete('/delete/:id', IsUser, schoolOwner, deleteSchoolBuilding);
SchoolBuildingRoutes.post('/donate/:id', IsUser, donateToSchoolBuilding);
SchoolBuildingRoutes.post('/initialize/:id', IsUser, initializeTransaction);
SchoolBuildingRoutes.post('/verify-donation', IsUser, schoolOwner, verifyDonation);

module.exports = SchoolBuildingRoutes;
