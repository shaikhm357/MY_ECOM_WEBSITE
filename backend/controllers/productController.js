import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch all products
// @route GET /api/products
// @acess public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch single products
// @route GET /api/products/:id
// @access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

// @desc DELETE a products
// @route DELETE /api/products/:id
// @access protected/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

export { getProducts, getProductById, deleteProduct }
