const router = require('express').Router();

const { authMiddleware, apartmentMiddleware, fileMiddleware } = require('../middlewares');
const { apartmentController } = require('../controllers');
const apartmentValidator = require('../validators/apartment.validator');

router.get('/', apartmentController.getApartments);

router.get('/:apartment_id', apartmentMiddleware.findApartmentById, apartmentController.getApartmentById);

router.post(
    '/filters',
    apartmentMiddleware.filterApartmentValid(apartmentValidator.filterApartmentValidator),
    apartmentController.getApartmentsFilter
);

router.use(authMiddleware.checkAccessToken);

router.post(
    '/',
    apartmentMiddleware.isApartmentValid(apartmentValidator.createApartmentValidator),
    fileMiddleware.checkApartmentPhoto,
    apartmentController.createApartment
);

module.exports = router;
