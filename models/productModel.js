import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    popular: { type: Boolean, default: false },
});

// Use capitalized model name consistently:
const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;
