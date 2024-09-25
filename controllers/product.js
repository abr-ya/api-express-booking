import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ message: "Please provide all fields" });
	}
  
  const newProduct = new Product(product);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (_, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ message: "Server Error" });
	}
};
