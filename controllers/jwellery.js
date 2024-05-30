import Product from '../models/jwellery.js';

export const AddProduct = async (req,res) => {
  try {
    // const product = r
    const file = req.file;
    const {name , price, category, rating, shipping } = req.body
    console.log(req.file);
    console.log(req.body);

    const fileLocation = `uploads/${file.filename}`;
    const product = new Product({
      image: fileLocation,
      price: price,
      name: name,
      shipping: shipping,
      star: rating,
      category: category
    });
 await product.save();
res.status(201).json({message:"data created Successfully" , location: fileLocation});
  } catch (error) {
    
  }
}


// Fetch All Products
export const fetchProducts = async (req,res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: err.message });
  }
}

// Fetch a single product by ID
export const fetchProductsByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const fetchProductsByCategory = async (req,res) => {
  try {
   
    // console.log("request query :",req.query);
    const products = await Product.find({
      category: req.query.category,
    });
    // console.log('Fetched products:', products);
  
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
}


export const fetchProductsByPrice = async(req,res) => {
  try {
    // console.log("request query from price :",req.query.price_gte);
    const products = await Product.find({
      price: { $gte: req.query.price_gte , $lte: req.query.price_lte }
    });
    // console.log('Fetched products:', products);
  
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
}

export const fetchProductByPriceAndCategory = async(req, res) => { 
  try {
    // console.log("request query from price :",req.query.price_gte);
    const products = await Product.find({
      category: req.query.category,
      price: { $gte: req.query.price_gte , $lte: req.query.price_lte }
    });
    // console.log('Fetched products:', products);
  
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }

}