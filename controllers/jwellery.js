import Product from "../models/jwellery.js";

export const AddProduct = async (req, res) => {
  try {
    const { name, price, category, rating, shipping } = req.body;
  
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const newImage = {
      data: req.file.buffer,
      contentType: req.file.mimeType
    }

    const product = new Product({
      image: newImage,
      price: Number(price),
      name,
      shipping,
      star: Number(rating),
      category,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
  
};

// Fetch All Products
export const fetchProducts = async (req, res) => {
  // var newProduct
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch a single product by ID
export const fetchProductsByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchProductsByCategory = async (req, res) => {
  try {
    // console.log("request query :",req.query);
    const products = await Product.find({
      category: req.query.category,
    });
    // console.log('Fetched products:', products);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

export const fetchProductsByPrice = async (req, res) => {
  try {
    // console.log("request query from price :",req.query.price_gte);
    const products = await Product.find({
      price: { $gte: req.query.price_gte, $lte: req.query.price_lte },
    });
    // console.log('Fetched products:', products);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

export const fetchProductByPriceAndCategory = async (req, res) => {
  try {
    // console.log("request query from price :",req.query.price_gte);
    const products = await Product.find({
      category: req.query.category,
      price: { $gte: req.query.price_gte, $lte: req.query.price_lte },
    });
    // console.log('Fetched products:', products);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};


// delete products

export const deleteProduct = async(req,res) => {

  try {
    const productId = req.params.productId;
    if(!productId){
      res.status(404).json({ message:"product Id not found"});
    }

    const product = await Product.findById(productId);
    if(!product){
      res.status(404).json({ message:"product not found"});
    }
    
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message:"product removed successfully"});
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
 


}