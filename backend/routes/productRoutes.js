import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  reviewProduct,
  getTopProduct
} from '../controllers/productController.js'
import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/top').get(getTopProduct)
router.route('/:id/reviews').post(protect, reviewProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default router
