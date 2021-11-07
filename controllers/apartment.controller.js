const Apartment = require('../dataBase/Apartment');
const O_Auth = require('../dataBase/O_Auth');
const { AUTHORIZATION } = require('../configs/constants');
const { fileService } = require('../services');

module.exports = {
    createApartment: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const o_Auth = await O_Auth.findOne({access_token: token});

            const apartment = req.body;

            const newApartment = await Apartment.create({...apartment, user_id: o_Auth.user_id});
            const { photo } = req.files || {};

            if (photo) {
                const uploadInfo = await fileService.uploadImage(photo, 'apartment', newApartment._id.toString());
                await Apartment.findOneAndUpdate(
                    newApartment._id,
                    { photo: uploadInfo },
                    {new: true});
            }

            res.json(apartment);
        } catch (e) {
            next(e);
        }
    },

    getApartments: async (req, res, next) => {
        try {
            const apartments = await Apartment.find();

            res.json(apartments);
        } catch (e) {
            next();
        }
    },

    getApartmentById: (req, res, next) => {
        try {
            const apartment = req.apartment;

            res.json(apartment);
        } catch (e) {
            next(e);
        }
    },

    getApartmentsFilter: async (req, res, next) => {
        try {
            const { country, city, district, area, number_of_person, price_start, price_end } = req.body;

            const fApartments = [];
            
            const apartments = await Apartment.find();

            for (const apartment of apartments) {
                // eslint-disable-next-line max-len
                if (apartment.country === country && apartment.city === city && apartment.district === district && apartment.area === area && apartment.number_of_person === number_of_person && apartment.price >= price_start && apartment.price <= price_end) {
                    fApartments.push(...fApartments, apartment);
                }
            }

            res.json(fApartments);
        } catch (e) {
            next(e);
        }
    }
};
