import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Routes
productRouter.post('/create', adminAuth, upload.single('image'), createProduct);
productRouter.post('/delete', adminAuth, deleteProduct);
productRouter.post('/single', getProductById);
productRouter.post('/list', getAllProducts);

// ✅ EXPORT the router
export default productRouter;
