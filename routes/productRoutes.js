const { Router } = require('express');

const { getProducts, getProduct } = require('../controllers/productController');

const router = Router();

router.route('/').get(getProducts);

router.route('/:slug').get(getProduct);

const productRoutes = router;

module.exports = productRoutes;
